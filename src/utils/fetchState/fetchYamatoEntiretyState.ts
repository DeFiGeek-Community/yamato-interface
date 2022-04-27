import { BigNumber } from 'ethers';
import {
  Pool,
  PriceFeed,
  PriorityRegistry,
  Yamato,
} from '../../infrastructures/abis/types';
import { formatCjpy, formatEther, formatYen } from '../web3';

export async function fetchYamatoEntiretyStateFromContract(contracts: {
  yamatoMainContract: Yamato | null;
  yamatoPoolContract: Pool | null;
  yamatoPriceFeedContract: PriceFeed | null;
  yamatoPriorityRegistryContract: PriorityRegistry | null;
}) {
  // Get states from contracts
  const yamatoMainResults = await getYamatoMainResults(
    contracts.yamatoMainContract
  );
  const yamatoPoolResults = await getYamatoPoolResults(
    contracts.yamatoPoolContract
  );
  const yamatoPriceFeedResults = await getYamatoPriceFeedResults(
    contracts.yamatoPriceFeedContract
  );
  const yamatoPriorityRegistryResults = await getYamatoPriorityRegistryResults(
    contracts.yamatoPriorityRegistryContract
  );

  // Create response
  const totalCollateral = Number(formatEther(yamatoMainResults[0])); // totalColl in Yamato.sol
  const totalDebt = Number(formatCjpy(yamatoMainResults[1])); // totalDebt in Yamato.sol
  const lending = {
    totalCollateral,
    totalDebt,
    tcr:
      totalDebt > 0
        ? ((totalCollateral * yamatoPriceFeedResults.rateOfEthJpy) /
            totalDebt) *
          100
        : 0,
    tvl: totalCollateral * yamatoPriceFeedResults.rateOfEthJpy,
  };
  const pool = {
    redemptionReserve: Number(formatEther(yamatoPoolResults[0])), // redemptionReserve in Pool.sol
    sweepReserve: Number(formatEther(yamatoPoolResults[1])), // sweepReserve in Pool.sol
  };
  const parameter = {
    MCR: yamatoMainResults[2],
    RRR: yamatoMainResults[3],
    SRR: yamatoMainResults[4],
    GRR: yamatoMainResults[5],
  };

  return {
    lending,
    pool,
    parameter,
    rateOfEthJpy: yamatoPriceFeedResults.rateOfEthJpy,
    pledges: {
      ...yamatoPriorityRegistryResults,
      isRedeemablePledge: yamatoPriorityRegistryResults.redeemableCandidate > 0,
    },
  };
}

export async function fetchRedeemablPledges(
  yamatoPriorityRegistryContract: PriorityRegistry | null
) {
  // Get states from contracts
  const yamatoPriorityRegistryResults = await getYamatoPriorityRegistryResults(
    yamatoPriorityRegistryContract
  );

  // Create response
  return {
    redeemableCandidate: yamatoPriorityRegistryResults.redeemableCandidate,
    isRedeemablePledge: yamatoPriorityRegistryResults.redeemableCandidate > 0,
  };
}

/**
 * private functions
 */

// Get states from Yamato.sol
async function getYamatoMainResults(
  yamatoMainContract: Yamato | null
): Promise<[BigNumber, BigNumber, number, number, number, number]> {
  return yamatoMainContract
    ? await yamatoMainContract.getStates() // totalColl, totalDebt, MCR, RRR, SRR, GRR
    : [BigNumber.from(0), BigNumber.from(0), 110, 80, 20, 1];
}

// Get states from Pool.sol
async function getYamatoPoolResults(
  yamatoPoolContract: Pool | null
): Promise<[BigNumber, BigNumber, BigNumber, BigNumber]> {
  return yamatoPoolContract
    ? await yamatoPoolContract.getStates() // redemptionReserve, sweepReserve, dividendReserve, lockedCollateral
    : [
        BigNumber.from(0),
        BigNumber.from(0),
        BigNumber.from(0),
        BigNumber.from(0),
      ];
}

// Get states from PriceFeed.sol
async function getYamatoPriceFeedResults(
  yamatoPriceFeedContract: PriceFeed | null
): Promise<{ rateOfEthJpy: number }> {
  return yamatoPriceFeedContract
    ? {
        rateOfEthJpy: Number(
          formatYen(await yamatoPriceFeedContract.getPrice())
        ),
      }
    : {
        rateOfEthJpy: 0,
      };
}

// Get states from PriorityRegistry.sol
async function getYamatoPriorityRegistryResults(
  yamatoPriorityRegistryContract: PriorityRegistry | null
): Promise<{ redeemableCandidate: number; sweepableCandidate: number }> {
  const results = yamatoPriorityRegistryContract
    ? {
        redeemableCandidate: Number(
          formatYen(await yamatoPriorityRegistryContract.getRedeemablesCap())
        ),
        sweepableCandidate: Number(
          formatYen(await yamatoPriorityRegistryContract.getSweepablesCap())
        ),
      }
    : {
        redeemableCandidate: 0,
        sweepableCandidate: 0,
      };

  return results;
}
