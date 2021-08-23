import { createReducer } from '@reduxjs/toolkit';
import { MCR } from '../../constants/yamato';
import { fetchEvents, fetchRateOfEthJpy, fetchYamatoState } from './actions';

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
  totalCollateral: number; // ETH
  totalDebt: number; // CJPY
  tvl: number; // ETH
  tcr: number; // Total Collateralization Ratio
  rateOfEthJpy: number; // ETH/JPY
  redemptionReserve: number; // ETH
  sweepReserve: number; // ETH
  sweepableCandiate: number; // CJPY
  events: Array<LogEvent>; // several ethereum events
}

export const initialState: YamatoEntiretyState = {
  totalCollateral: 0,
  totalDebt: 0,
  tvl: 0,
  tcr: MCR,
  rateOfEthJpy: 0,
  redemptionReserve: 0,
  sweepReserve: 0,
  sweepableCandiate: 0,
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
        state.totalCollateral = totalCollateral;
        state.totalDebt = totalDebt;
        state.tvl = tvl;
        state.tcr = tcr;
        state.redemptionReserve = redemptionReserve;
        state.sweepReserve = sweepReserve;
        state.sweepableCandiate = sweepableCandiate;
      }
    )
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
