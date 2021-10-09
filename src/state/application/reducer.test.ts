import { createStore, Store } from 'redux';

import {
  ApplicationModal,
  setOpenModal,
  updateBlockNumber,
  updateChainId,
} from './actions';
import reducer, { ApplicationState } from './reducer';

describe('application reducer', () => {
  let store: Store<ApplicationState>;

  beforeEach(() => {
    store = createStore(reducer, {
      chainId: null,
      chainConnectivityWarning: false,
      blockNumber: {
        [1]: 3,
      },
      openModal: null,
    });
  });

  describe('setOpenModal', () => {
    it('set wallet modal', () => {
      store.dispatch(setOpenModal(ApplicationModal.WALLET));
      expect(store.getState().openModal).toEqual(ApplicationModal.WALLET);
      store.dispatch(setOpenModal(ApplicationModal.WALLET));
      expect(store.getState().openModal).toEqual(ApplicationModal.WALLET);
      store.dispatch(setOpenModal(null));
      expect(store.getState().openModal).toEqual(null);
    });
  });

  describe('updateChainId', () => {
    it('updates chain id', () => {
      expect(store.getState().chainId).toEqual(null);

      store.dispatch(updateChainId({ chainId: 1 }));

      expect(store.getState().chainId).toEqual(1);
    });
  });

  describe('updateBlockNumber', () => {
    it('updates block number', () => {
      store.dispatch(updateBlockNumber({ chainId: 1, blockNumber: 4 }));
      expect(store.getState().blockNumber[1]).toEqual(4);
    });
    it('no op if late', () => {
      store.dispatch(updateBlockNumber({ chainId: 1, blockNumber: 2 }));
      expect(store.getState().blockNumber[1]).toEqual(3);
    });
    it('works with non-set chains', () => {
      store.dispatch(updateBlockNumber({ chainId: 3, blockNumber: 2 }));
      expect(store.getState().blockNumber).toEqual({
        [1]: 3,
        [3]: 2,
      });
    });
  });
});
