import { Store, createStore } from '@reduxjs/toolkit';
import { fetchingEthRate } from './actions';
import reducer, { YamatoEntiretyState } from './reducer';

describe('yamato-entirety reducer', () => {
  let store: Store<YamatoEntiretyState>;

  beforeEach(() => {
    store = createStore(reducer);
  });

  it('has correct initial state', () => {
    expect(store.getState()).toEqual({ rateOfEthJpy: 0 });
  });

  describe('fetchingEthRate', () => {
    it('fetching Eth Rate', () => {
      store.dispatch(fetchingEthRate({ rateOfEthJpy: 10 }));
      expect(store.getState()).toEqual({ rateOfEthJpy: 10 });
    });
  });
});
