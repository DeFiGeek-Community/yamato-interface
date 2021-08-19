import { createReducer } from '@reduxjs/toolkit';
import { MCR } from '../../constants/yamato';
import { fetchRateOfEthJpy, fetchYamatoState } from './actions';

export interface YamatoEntiretyState {
  totalCollateral: number; // ETH
  totalDebt: number; // CJPY
  tcr: number; // Total Collateralization Ratio
  rateOfEthJpy: number; // ETH/JPY
  redemptionReserve: number; // ETH
  sweepReserve: number; // ETH
}

export const initialState: YamatoEntiretyState = {
  totalCollateral: 0,
  totalDebt: 0,
  tcr: MCR,
  rateOfEthJpy: 0,
  redemptionReserve: 0,
  sweepReserve: 0,
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
            tcr,
            redemptionReserve,
            sweepReserve,
          },
        }
      ) => {
        state.totalCollateral = totalCollateral;
        state.totalDebt = totalDebt;
        state.tcr = tcr;
        state.redemptionReserve = redemptionReserve;
        state.sweepReserve = sweepReserve;
      }
    )
    .addCase(fetchRateOfEthJpy, (state, { payload: { rateOfEthJpy } }) => {
      state.rateOfEthJpy = rateOfEthJpy;
    })
);
