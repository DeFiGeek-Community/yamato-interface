import { Store, createStore } from '@reduxjs/toolkit';
import { fetchRateOfCjpyJpy } from './actions';
import reducer, { initialState, MarketState } from './reducer';

describe('market reducer', () => {
  let store: Store<MarketState>;

  beforeEach(() => {
    store = createStore(reducer);
  });

  it('has correct initial state', () => {
    expect(store.getState()).toEqual(initialState);
  });

  describe('fetchRateOfCjpyJpy', () => {
    it('fetch Rate Of CjpyJpy', () => {
      const source = 'uniswap';
      const rateOfCjpyJpy = 10;

      store.dispatch(fetchRateOfCjpyJpy({ source, rateOfCjpyJpy }));
      expect(store.getState()).toEqual({
        ...initialState,
        rateOfCjpyJpy: { [source]: rateOfCjpyJpy },
      });
    });
  });
});
