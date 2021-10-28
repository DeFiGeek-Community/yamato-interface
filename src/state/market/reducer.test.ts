import { Store, createStore } from '@reduxjs/toolkit';
import { fetchRateOfCjpyEth } from './actions';
import reducer, { initialState, MarketState } from './reducer';

describe('market reducer', () => {
  let store: Store<MarketState>;

  beforeEach(() => {
    store = createStore(reducer);
  });

  it('has correct initial state', () => {
    expect(store.getState()).toEqual(initialState);
  });

  describe('fetchRateOfCjpyEth', () => {
    it('fetch Rate Of CjpyEth', () => {
      const source = 'uniswap(v3)';
      const rateOfCjpyEth = 10;

      store.dispatch(fetchRateOfCjpyEth({ source, rateOfCjpyEth }));
      expect(store.getState().rateOfCjpyEth).toEqual({
        [source]: rateOfCjpyEth,
      });
    });

    it('should set if source exist and rate is 0', () => {
      const source = 'uniswap(v3)';
      const rateOfCjpyEth = 0;

      store.dispatch(fetchRateOfCjpyEth({ source, rateOfCjpyEth }));
      expect(store.getState().rateOfCjpyEth).toEqual({
        [source]: rateOfCjpyEth,
      });
    });

    it('should delete the source if source exist and rate is nulls', () => {
      const source = 'uniswap(v3)';
      const rateOfCjpyEth = null;

      store.dispatch(fetchRateOfCjpyEth({ source, rateOfCjpyEth }));
      expect(store.getState().rateOfCjpyEth).toEqual({});
    });
  });
});
