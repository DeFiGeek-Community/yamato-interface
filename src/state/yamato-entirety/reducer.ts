import { createReducer } from '@reduxjs/toolkit';
import { MCR } from '../../constants/yamato';
import { fetchRateOfEthJpy, fetchYamatoState } from './actions';

export interface YamatoEntiretyState {
  totalCollateral: number; // ETH
  totalDebt: number; // CJPY
  tcr: number; // Total Collateralization Ratio
  rateOfEthJpy: number; // ETH/JPY
}

export const initialState: YamatoEntiretyState = {
  totalCollateral: 0,
  totalDebt: 0,
  tcr: MCR,
  rateOfEthJpy: 0,
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(
      fetchYamatoState,
      (state, { payload: { totalCollateral, totalDebt, tcr } }) => {
        state.totalCollateral = totalCollateral;
        state.totalDebt = totalDebt;
        state.tcr = tcr;
      }
    )
    .addCase(fetchRateOfEthJpy, (state, { payload: { rateOfEthJpy } }) => {
      state.rateOfEthJpy = rateOfEthJpy;
    })
);
