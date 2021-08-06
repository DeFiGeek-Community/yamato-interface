import { createStore, Store } from 'redux';
import { SupportedChainId } from '../../constants/chains';
import {
  addPopup,
  ApplicationModal,
  endTx,
  removePopup,
  setOpenModal,
  startTx,
  updateBlockNumber,
} from './actions';
import reducer, { ApplicationState } from './reducer';

describe('application reducer', () => {
  let store: Store<ApplicationState>;

  beforeEach(() => {
    store = createStore(reducer, {
      popupList: [],
      blockNumber: {
        [SupportedChainId.MAINNET]: 3,
      },
      openModal: null,
      txCount: 0,
    });
  });

  describe('addPopup', () => {
    it('adds the popup to list with a generated id', () => {
      store.dispatch(
        addPopup({
          content: { txn: { hash: 'abc', summary: 'test', success: true } },
        })
      );
      const list = store.getState().popupList;
      expect(list).toHaveLength(1);
      expect(typeof list[0].key).toEqual('string');
      expect(list[0].show).toEqual(true);
      expect(list[0].content).toEqual({
        txn: { hash: 'abc', summary: 'test', success: true },
      });
      expect(list[0].removeAfterMs).toEqual(25000);
    });

    it('replaces any existing popups with the same key', () => {
      store.dispatch(
        addPopup({
          key: 'abc',
          content: { txn: { hash: 'abc', summary: 'test', success: true } },
        })
      );
      store.dispatch(
        addPopup({
          key: 'abc',
          content: { txn: { hash: 'def', summary: 'test2', success: false } },
        })
      );
      const list = store.getState().popupList;
      expect(list).toHaveLength(1);
      expect(list[0].key).toEqual('abc');
      expect(list[0].show).toEqual(true);
      expect(list[0].content).toEqual({
        txn: { hash: 'def', summary: 'test2', success: false },
      });
      expect(list[0].removeAfterMs).toEqual(25000);
    });
  });

  describe('setOpenModal', () => {
    it('set wallet modal', () => {
      store.dispatch(setOpenModal(ApplicationModal.WALLET));
      expect(store.getState().openModal).toEqual(ApplicationModal.WALLET);
      store.dispatch(setOpenModal(ApplicationModal.WALLET));
      expect(store.getState().openModal).toEqual(ApplicationModal.WALLET);
      // store.dispatch(setOpenModal(ApplicationModal.CLAIM_POPUP));
      // expect(store.getState().openModal).toEqual(ApplicationModal.CLAIM_POPUP);
      store.dispatch(setOpenModal(null));
      expect(store.getState().openModal).toEqual(null);
    });
  });

  describe('updateBlockNumber', () => {
    it('updates block number', () => {
      store.dispatch(
        updateBlockNumber({ chainId: SupportedChainId.MAINNET, blockNumber: 4 })
      );
      expect(store.getState().blockNumber[SupportedChainId.MAINNET]).toEqual(4);
    });
    it('no op if late', () => {
      store.dispatch(
        updateBlockNumber({ chainId: SupportedChainId.MAINNET, blockNumber: 2 })
      );
      expect(store.getState().blockNumber[SupportedChainId.MAINNET]).toEqual(3);
    });
    it('works with non-set chains', () => {
      store.dispatch(
        updateBlockNumber({ chainId: SupportedChainId.ROPSTEN, blockNumber: 2 })
      );
      expect(store.getState().blockNumber).toEqual({
        [SupportedChainId.MAINNET]: 3,
        [SupportedChainId.ROPSTEN]: 2,
      });
    });
  });

  describe('removePopup', () => {
    beforeEach(() => {
      store.dispatch(
        addPopup({
          key: 'abc',
          content: { txn: { hash: 'abc', summary: 'test', success: true } },
        })
      );
    });
    it('hides the popup', () => {
      expect(store.getState().popupList[0].show).toBe(true);
      store.dispatch(removePopup({ key: 'abc' }));
      expect(store.getState().popupList).toHaveLength(1);
      expect(store.getState().popupList[0].show).toBe(false);
    });
  });

  describe('startTx', () => {
    it('plus 1', () => {
      expect(store.getState().txCount).toBe(0);
      store.dispatch(startTx());
      expect(store.getState().txCount).toBe(1);
    });
  });

  describe('endTx', () => {
    it('minus 1', () => {
      expect(store.getState().txCount).toBe(0);
      store.dispatch(endTx({}));
      expect(store.getState().txCount).toBe(-1);
    });
  });
});
