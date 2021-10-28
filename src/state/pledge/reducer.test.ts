import { Store, createStore } from '@reduxjs/toolkit';
import { fetchMyPledge } from './actions';
import reducer, { PledgeState } from './reducer';

describe('pledge reducer', () => {
  let store: Store<PledgeState>;
  const defaultOwner = '0x1234567890123456789012345678901234567890';

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
  });
});
