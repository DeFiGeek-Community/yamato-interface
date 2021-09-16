import { createReducer } from '@reduxjs/toolkit';
import { fetchRateOfCjpyJpy } from './actions';

export type PriceSource = 'uniswap' | 'balancer';

/**
 * State gotten from External Markets such as DEX and statistical sites.
 */
export interface MarketState {
  rateOfCjpyJpy: { [source: string]: number }; // CJPY/JPY per source.
}

export const initialState: MarketState = {
  rateOfCjpyJpy: {},
};

export default createReducer(initialState, (builder) =>
  builder.addCase(
    fetchRateOfCjpyJpy,
    (state, { payload: { source, rateOfCjpyJpy } }) => {
      state.rateOfCjpyJpy[source] = rateOfCjpyJpy;
    }
  )
);
