import { createReducer } from '@reduxjs/toolkit';
import { MCR } from '../../constants/yamato';
import {
  fetchEvents,
  fetchRateOfEthJpy,
  fetchTokenState,
  fetchYamatoState,
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
  | 'yamato_redemption'
  | 'yamato_sweep';
export type LogEvent = {
  id: string;
  date: number;
  address: string;
  category: LogEventType;
  value: any;
};

/**
 * State over all in Yamato Contract
 */
export interface YamatoEntiretyState {
  lending: {
    totalCollateral: number; // ETH
    totalDebt: number; // CJPY
    tvl: number; // ETH
    tcr: number; // Total Collateralization Ratio
  };
  pool: {
    redemptionReserve: number; // ETH
    sweepReserve: number; // ETH
    sweepableCandiate: number; // CJPY
  };
  token: {
    cjpy: { totalSupply: number };
    ymt: { totalSupply: number };
    veYmt: { totalSupply: number; boostRate: number; farmingScore: number };
  };
  rateOfEthJpy: number; // ETH/JPY
  events: Array<LogEvent>; // several ethereum events
}

export const initialState: YamatoEntiretyState = {
  lending: { totalCollateral: 0, totalDebt: 0, tvl: 0, tcr: MCR },
  pool: {
    redemptionReserve: 0,
    sweepReserve: 0,
    sweepableCandiate: 0,
  },
  token: {
    cjpy: { totalSupply: 0 },
    ymt: { totalSupply: 0 },
    veYmt: { totalSupply: 0, boostRate: 0, farmingScore: 0 },
  },
  rateOfEthJpy: 0,
  events: [],
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(
      fetchYamatoState,
      (
        state,
        {
          payload: {
            totalCollateral,
            totalDebt,
            tvl,
            tcr,
            redemptionReserve,
            sweepReserve,
            sweepableCandiate,
          },
        }
      ) => {
        state.lending = { totalCollateral, totalDebt, tvl, tcr };
        state.pool = { redemptionReserve, sweepReserve, sweepableCandiate };
      }
    )
    .addCase(fetchTokenState, (state, { payload: { cjpy, ymt, veYmt } }) => {
      const farmingScore = state.lending.totalDebt * veYmt.boostRate; // FIXME: 担保率ブースト
      const newState = { ...veYmt, farmingScore };
      state.token = { cjpy, ymt, veYmt: newState };
    })
    .addCase(fetchRateOfEthJpy, (state, { payload: { rateOfEthJpy } }) => {
      state.rateOfEthJpy = rateOfEthJpy;
    })
    .addCase(fetchEvents, (state, { payload: { events } }) => {
      const additionals = events.filter((newEvent) => {
        return !state.events.some((event) => event.id === newEvent.id);
      });
      const newState = state.events.concat(additionals).sort((a, b) => {
        if (a.date > b.date) {
          return -1;
        } else if (a.date < b.date) {
          return 1;
        }
        return 0;
      });
      state.events = newState;
    })
);
