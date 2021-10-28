import { Store, createStore } from '@reduxjs/toolkit';
import { fetchMyPledge } from './actions';
import reducer, { PledgeState } from './reducer';

describe('pledge reducer', () => {
  let store: Store<PledgeState>;
  const defaultOwner = '0xabcdefghij123456789012345678901234567890';

  beforeEach(() => {
    store = createStore(reducer);
  });

  it('has correct initial state', () => {
    expect(store.getState()).toEqual({});
  });

  describe('fetchMyPledge', () => {
    it('fetch My Pledges', () => {
      const expected = {
        [defaultOwner]: {
          collateral: 10,
          debt: 5,
          withdrawalLockDate: 0,
        },
      };
      store.dispatch(fetchMyPledge(expected));
      expect(store.getState()).toEqual(expected);
    });

    it('should be lower case if address has upper case character', () => {
      const expected = {
        [defaultOwner.toUpperCase()]: {
          collateral: 10,
          debt: 5,
          withdrawalLockDate: 0,
        },
      };
      store.dispatch(fetchMyPledge(expected));
      expect(Object.keys(store.getState())[0]).toEqual(
        defaultOwner.toLowerCase()
      );
    });

    it('should be correct even if address is empty', () => {
      const expected = {
        '': {
          collateral: 10,
          debt: 5,
          withdrawalLockDate: 0,
        },
      };
      store.dispatch(fetchMyPledge(expected));
      expect(store.getState()).toEqual(expected);
    });
  });
});
