import { useSelector } from 'react-redux';
import { getEthChangePercent } from '../../utils/prices';
import { AppState } from '../index';

/**
 * selector
 */
export function useYamatoStateForDashboard() {
  return useSelector((state: AppState) => {
    return {
      totalSupplyOfCjpy: state.yamatoEntirety.token.cjpy.totalSupply,
      tvl: state.yamatoEntirety.lending.tvl,
      tcr: state.yamatoEntirety.lending.tcr,
      rateOfEthJpy: state.yamatoEntirety.rateOfEthJpy,
      rateOfCjpyJpy: createRateOfCjpyJpy(
        state.market.rateOfCjpyEth,
        state.yamatoEntirety.rateOfEthJpy
      ),
      ethChangePercent: getEthChangePercent(
        state.yamatoEntirety.rateOfEthJpy,
        state.yamatoEntirety.prevRateOfEthJpy
      ),
      firstLoadCompleted: state.yamatoEntirety.firstLoadCompleted,
    };
  });
}
export function useYamatoStateForPledge() {
  return useSelector((state: AppState) => ({
    rateOfEthJpy: state.yamatoEntirety.rateOfEthJpy,
    redemptionReserve: state.yamatoEntirety.pool.redemptionReserve,
    sweepReserve: state.yamatoEntirety.pool.sweepReserve,
    redeemableCandidate: state.yamatoEntirety.pledges.redeemableCandidate,
    sweepableCandiate: state.yamatoEntirety.pledges.sweepableCandidate,
    MCR: state.yamatoEntirety.parameter.MCR,
    GRR: state.yamatoEntirety.parameter.GRR,
    firstLoadCompleted: state.yamatoEntirety.firstLoadCompleted,
  }));
}
export function useYamatoStateForWorld() {
  return useSelector((state: AppState) => ({
    events: state.yamatoEntirety.events.slice(0, 20),
    firstLoadCompleted: state.yamatoEntirety.firstLoadCompleted,
  }));
}
export function useYamatoStateForInfographics() {
  return useSelector((state: AppState) => {
    return {
      rateOfCjpyJpy: createRateOfCjpyJpy(
        state.market.rateOfCjpyEth,
        state.yamatoEntirety.rateOfEthJpy
      ),
      totalCollateral: state.yamatoEntirety.lending.totalCollateral,
      totalDebt: state.yamatoEntirety.lending.totalDebt,
      tcr: state.yamatoEntirety.lending.tcr,
      rateOfEthJpy: state.yamatoEntirety.rateOfEthJpy,
      prevRateOfEthJpy: state.yamatoEntirety.prevRateOfEthJpy,
      redemptionReserve: state.yamatoEntirety.pool.redemptionReserve,
      prevRedemptionReserve: state.yamatoEntirety.pool.prevRedemptionReserve,
      sweepReserve: state.yamatoEntirety.pool.sweepReserve,
      prevSweepReserve: state.yamatoEntirety.pool.prevSweepReserve,
      MCR: state.yamatoEntirety.parameter.MCR,
      isRedeemablePledge: state.yamatoEntirety.pledges.isRedeemablePledge,
    };
  });
}

/**
 * utils
 */

function createRateOfCjpyJpy(
  rateOfCjpyEth: { [source: string]: number },
  rateOfEthJpy: number
) {
  return Object.entries(rateOfCjpyEth)
    .sort((a, b) => (a[1] > b[1] ? -1 : 1))
    .map((data) => {
      data[1] = convertCjpyToEth(data[1], rateOfEthJpy);
      return data;
    });
}

function convertCjpyToEth(amount: number, rateOfEthJpy: number) {
  return rateOfEthJpy && amount ? rateOfEthJpy / amount : 0;
}
