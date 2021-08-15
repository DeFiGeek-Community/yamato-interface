import { createReducer } from '@reduxjs/toolkit';
import { fetchingEthRate } from './actions';

export interface YamatoEntiretyState {
  rateOfEthJpy: number; // ETH/JPY
}

const initialState: YamatoEntiretyState = { rateOfEthJpy: 0 };

export default createReducer(initialState, (builder) =>
  builder.addCase(fetchingEthRate, (state, { payload: { rateOfEthJpy } }) => {
    state.rateOfEthJpy = rateOfEthJpy;
  })
);
