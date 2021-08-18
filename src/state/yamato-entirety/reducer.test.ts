import { Store, createStore } from '@reduxjs/toolkit';
import { fetchRateOfEthJpy } from './actions';
import reducer, { initialState, YamatoEntiretyState } from './reducer';

describe('yamato-entirety reducer', () => {
  let store: Store<YamatoEntiretyState>;

  beforeEach(() => {
    store = createStore(reducer);
  });

  it('has correct initial state', () => {
    expect(store.getState()).toEqual({ ...initialState, rateOfEthJpy: 0 });
  });

  describe('fetchYamatoState', () => {
    it('fetch Yamato State', () => {
      store.dispatch(fetchRateOfEthJpy({ rateOfEthJpy: 10 }));
      expect(store.getState()).toEqual({ ...initialState, rateOfEthJpy: 10 });
    });
  });

  describe('fetchRateOfEthJpy', () => {
    it('fetch Eth Rate', () => {
      store.dispatch(fetchRateOfEthJpy({ rateOfEthJpy: 10 }));
      expect(store.getState()).toEqual({ ...initialState, rateOfEthJpy: 10 });
    });
  });
});
