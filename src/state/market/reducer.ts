import { createReducer } from '@reduxjs/toolkit';
import { fetchRateOfCjpyEth } from './actions';

export type PriceSource = 'uniswap(v3)' | 'uniswap(v2)';

/**
 * State gotten from External Markets such as DEX and statistical sites.
 */
export interface MarketState {
  rateOfCjpyEth: { [source: string]: number }; // CJPY/JPY per source.
}

export const initialState: MarketState = {
  rateOfCjpyEth: {},
};

export default createReducer(initialState, (builder) =>
  builder.addCase(
    fetchRateOfCjpyEth,
    (state, { payload: { source, rateOfCjpyEth } }) => {
      if (rateOfCjpyEth != null) {
        state.rateOfCjpyEth[source] = rateOfCjpyEth;
      } else {
        if (state.rateOfCjpyEth[source] != null) {
          delete state.rateOfCjpyEth[source];
        }
      }
    }
  )
);
