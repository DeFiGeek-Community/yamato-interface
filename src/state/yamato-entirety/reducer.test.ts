import { Store, createStore } from '@reduxjs/toolkit';
import { fetchRateOfEthJpy, fetchYamatoState } from './actions';
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
      const newState = {
        totalCollateral: 10,
        totalDebt: 5,
        tcr: 110,
        redemptionReserve: 2,
        sweepReserve: 1,
        sweepableCandiate: 0.5,
      };

      store.dispatch(fetchYamatoState(newState));
      expect(store.getState()).toEqual({ ...initialState, ...newState });
    });
  });

  describe('fetchRateOfEthJpy', () => {
    it('fetch Eth Rate', () => {
      store.dispatch(fetchRateOfEthJpy({ rateOfEthJpy: 10 }));
      expect(store.getState()).toEqual({ ...initialState, rateOfEthJpy: 10 });
    });
  });
});
