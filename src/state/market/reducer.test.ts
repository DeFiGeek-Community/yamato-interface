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
      expect(store.getState()).toEqual({
        ...initialState,
        rateOfCjpyEth: { [source]: rateOfCjpyEth },
      });
    });
  });
});
