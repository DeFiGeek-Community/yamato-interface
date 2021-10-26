import { createReducer } from '@reduxjs/toolkit';
import {
  fetchEvents,
  fetchRateOfEthJpy,
  fetchTokenState,
  fetchYamatoState,
  resetEvents,
} from './actions';

export type LogEventType =
  | 'deposit'
  | 'withdrawal'
  | 'borrowing'
  | 'repay'
  | 'governance_lock'
  | 'governance_extension'
  | 'governance_withdrawal'
  | 'self_redemption'
  | 'core_redemption'
  | 'sweep';
export type LogEvent = {
  id: number;
  address: string;
  category: LogEventType;
  value: any;
};

/**
 * State over all in Yamato Contract
 */
export interface YamatoEntiretyState {
  lending: {
    // the parameters about CJPY lending.
    totalCollateral: number; // the ETH amount of collateral that the plege is holding.
    totalDebt: number; // the CJPY amount of debt that the users plege is holding.
    tvl: number; // ETH
    tcr: number; // Total Collateralization Ratio of the users plege, derived from `(totalCollateral * rateOfEthJpy / totalDebt)`
  };
  pool: {
    redemptionReserve: number; // CJPY
    prevRedemptionReserve: number; // CJPY
    sweepReserve: number; // CJPY
    prevSweepReserve: number; // CJPY
    sweepableCandiate: number; // ETH
  };
  token: {
    cjpy: {
      totalSupply: number; // the total amount of CJPY that the Yamato protocol is supplying.
    };
    ymt: {
      totalSupply: number; // the total amount of YMT that the Yamato protocol is supplying.
    };
    veYmt: {
      totalSupply: number; // the total amount of veYMT that the Yamato protocol is supplying.
      boostRate: number;
      farmingScore: number;
    };
  };
  rateOfEthJpy: number; // the market price of ETH/JPY
  prevRateOfEthJpy: number; // the previous market price of ETH/JPY
  parameter: {
    MCR: number; // MinimumCollateralizationRatio
    RRR: number; // RedemptionReserveRate
    SRR: number; // SweepReserveRate
    GRR: number; // GasReserveRate
  };
  isRedeemablePledge: boolean;
  events: Array<LogEvent>; // the Ethereum events the users wallet has been recieved.
}

export const initialState: YamatoEntiretyState = {
  lending: { totalCollateral: 0, totalDebt: 0, tvl: 0, tcr: 0 },
  pool: {
    redemptionReserve: 0,
    prevRedemptionReserve: 0,
    sweepReserve: 0,
    prevSweepReserve: 0,
    sweepableCandiate: 0,
  },
  token: {
    cjpy: { totalSupply: 0 },
    ymt: { totalSupply: 0 },
    veYmt: { totalSupply: 0, boostRate: 0, farmingScore: 0 },
  },
  rateOfEthJpy: 0,
  prevRateOfEthJpy: 0,
  parameter: {
    MCR: 110,
    RRR: 80,
    SRR: 20,
    GRR: 1,
  },
  isRedeemablePledge: false,
  events: [],
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(
      fetchYamatoState,
      (
        state,
        { payload: { lending, pool, parameter, isRedeemablePledge } }
      ) => {
        state.lending = lending;
        state.pool = {
          ...pool,
          prevRedemptionReserve: state.pool.redemptionReserve,
          prevSweepReserve: state.pool.sweepReserve,
        };
        state.parameter = parameter;
        state.isRedeemablePledge = isRedeemablePledge;
      }
    )
    .addCase(fetchTokenState, (state, { payload: { cjpy, ymt, veYmt } }) => {
      const farmingScore = state.lending.totalDebt * veYmt.boostRate; // FIXME: 担保率ブースト
      const newState = { ...veYmt, farmingScore };
      state.token = { cjpy, ymt, veYmt: newState };
    })
    .addCase(fetchRateOfEthJpy, (state, { payload: { rateOfEthJpy } }) => {
      state.prevRateOfEthJpy = state.rateOfEthJpy;
      state.rateOfEthJpy = rateOfEthJpy;
    })
    .addCase(fetchEvents, (state, { payload: { events } }) => {
      const additionals = events.filter((newEvent) => {
        return !state.events.some((event) => event.id === newEvent.id);
      });
      const newState = state.events.concat(additionals).sort((a, b) => {
        if (a.id > b.id) {
          return -1;
        } else if (a.id < b.id) {
          return 1;
        }
        return 0;
      });
      state.events = newState;
    })
    .addCase(resetEvents, (state) => {
      state.events = [];
    })
);
