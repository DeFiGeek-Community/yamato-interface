import { createReducer } from '@reduxjs/toolkit';
import { fetchingEthRate } from './actions';

export interface MarketState {
  rate: number; // ETH/JPY
}

const initialState: MarketState = { rate: 0 };

export default createReducer(initialState, (builder) =>
  builder.addCase(fetchingEthRate, (state, { payload: { rate } }) => {
    state.rate = rate;
  })
);
