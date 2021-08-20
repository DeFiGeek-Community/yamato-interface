import { Store, createStore } from '@reduxjs/toolkit';
import { fetchWallet } from './actions';
import reducer, { initialState, WalletState } from './reducer';

describe('market reducer', () => {
  let store: Store<WalletState>;

  beforeEach(() => {
    store = createStore(reducer);
  });

  it('has correct initial state', () => {
    expect(store.getState()).toEqual(initialState);
  });

  describe('fetchWallet', () => {
    it('fetch Wallet', () => {
      const cjpy = 1000;
      const eth = 1;

      store.dispatch(fetchWallet({ cjpy, eth }));
      expect(store.getState()).toEqual({
        ...initialState,
        cjpy,
        eth,
      });
    });
  });
});
