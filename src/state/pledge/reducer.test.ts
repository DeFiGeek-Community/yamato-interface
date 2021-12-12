import { Store, createStore } from '@reduxjs/toolkit';
import { fetchMyPledge, reset } from './actions';
import reducer, { initialState, PledgeDetail, PledgeState } from './reducer';

describe('pledge reducer', () => {
  let store: Store<PledgeState>;
  const defaultOwner = '0xabcdefghij123456789012345678901234567890';

  beforeEach(() => {
    store = createStore(reducer);
  });

  it('has correct initial state', () => {
    expect(store.getState()).toEqual(initialState);
  });

  describe('fetchMyPledge', () => {
    it('fetch My Pledges', () => {
      const expected: PledgeDetail = {
        [defaultOwner]: {
          collateral: 10,
          debt: 5,
        },
      };
      store.dispatch(fetchMyPledge(expected));
      expect(store.getState().list).toEqual(expected);
    });

    it('should be lower case if address has upper case character', () => {
      const expected: PledgeDetail = {
        [defaultOwner.toUpperCase()]: {
          collateral: 10,
          debt: 5,
        },
      };
      store.dispatch(fetchMyPledge(expected));
      expect(Object.keys(store.getState().list)[0]).toEqual(
        defaultOwner.toLowerCase()
      );
    });

    it('should be correct even if address is empty', () => {
      const expected: PledgeDetail = {
        '': {
          collateral: 10,
          debt: 5,
        },
      };
      store.dispatch(fetchMyPledge(expected));
      expect(store.getState().list).toEqual({});
    });
  });

  describe('reset', () => {
    it('reset', () => {
      const expected: PledgeDetail = {
        [defaultOwner]: {
          collateral: 10,
          debt: 5,
        },
      };
      store.dispatch(fetchMyPledge(expected));
      expect(Object.keys(store.getState().list)[0]).toBe(defaultOwner);

      store.dispatch(reset());
      expect(store.getState().list).toEqual({});
    });
  });
});
