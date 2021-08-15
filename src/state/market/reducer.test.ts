import { Store, createStore } from '@reduxjs/toolkit';
import { fetchingEthRate } from './actions';
import reducer, { MarketState } from './reducer';

describe('market reducer', () => {
  let store: Store<MarketState>;

  beforeEach(() => {
    store = createStore(reducer);
  });

  it('has correct initial state', () => {
    expect(store.getState()).toEqual({ rate: 0 });
  });

  describe('fetchingEthRate', () => {
    it('fetching Eth Rate', () => {
      store.dispatch(fetchingEthRate({ rate: 10 }));
      expect(store.getState()).toEqual({ rate: 10 });
    });
  });
});
