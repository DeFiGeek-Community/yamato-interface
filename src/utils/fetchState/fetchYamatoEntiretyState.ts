import { AddressZero } from '@ethersproject/constants';
import { BigNumber } from 'ethers';
import {
  useYamatoMainContract,
  useYamatoPoolContract,
  useYamatoPriceFeedContract,
} from '../../hooks/useContract';
import {
  Pool,
  PriceFeed,
  PriorityRegistry,
  Yamato,
} from '../../infrastructures/abis/types';
import { formatCjpy, formatEther, formatYen } from '../web3';

export function useFetchYamatoEntiretyState() {
  const yamatoMainContract = useYamatoMainContract();
  const yamatoPoolContract = useYamatoPoolContract();
  const yamatoPriceFeedContract = useYamatoPriceFeedContract();

  // TODO: subgraph pattern
  return fetchYamatoEntiretyStateFromContract;
}

export async function fetchYamatoEntiretyStateFromContract(contracts: {
  yamatoMainContract: Yamato | null;
  yamatoPoolContract: Pool | null;
  yamatoPriceFeedContract: PriceFeed | null;
  yamatoPriorityRegistryContract: PriorityRegistry | null;
}) {
  // Yamato.sol
  const yamatoMainResults: [
    BigNumber,
    BigNumber,
    number,
    number,
    number,
    number
  ] = contracts.yamatoMainContract
    ? await contracts.yamatoMainContract.getStates() // totalColl, totalDebt, MCR, RRR, SRR, GRR
    : [BigNumber.from(0), BigNumber.from(0), 110, 80, 20, 1];
  // Pool.sol
  const yamatoPoolResults: [BigNumber, BigNumber, BigNumber, BigNumber] =
    contracts.yamatoPoolContract
      ? await contracts.yamatoPoolContract.getStates() // redemptionReserve, sweepReserve, dividendReserve, lockedCollateral
      : [
          BigNumber.from(0),
          BigNumber.from(0),
          BigNumber.from(0),
          BigNumber.from(0),
        ];
  // PriceFeed.sol
  const yamatoPriceFeedResults = contracts.yamatoPriceFeedContract
    ? {
        rateOfEthJpy: Number(
          formatYen(await contracts.yamatoPriceFeedContract.lastGoodPrice())
        ),
      }
    : {
        rateOfEthJpy: 0,
      };
  // PriorityRegistry.sol
  const yamatoPriorityRegistryResults = contracts.yamatoPriorityRegistryContract
    ? {
        isRedeemablePledge:
          (
            await contracts.yamatoPriorityRegistryContract.nextRedeemable()
          )[3] !== AddressZero,
      }
    : {
        isRedeemablePledge: false,
      };

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
    tvl: Number(formatEther(yamatoPoolResults[3])), // lockedCollateral in Pool.sol
  };
  const pool = {
    redemptionReserve: Number(formatEther(yamatoPoolResults[0])), // redemptionReserve in Pool.sol
    sweepReserve: Number(formatEther(yamatoPoolResults[1])), // sweepReserve in Pool.sol
    sweepableCandiate: 10, // FIXME: ISSUE #27
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
    isRedeemablePledge: yamatoPriorityRegistryResults.isRedeemablePledge,
  };
}
