import { Store, createStore } from '@reduxjs/toolkit';
import {
  depositCollateral,
  fetchingMyPledge,
  withdrawCollateral,
} from './actions';
import reducer, { PledgeState } from './reducer';

describe('pledge reducer', () => {
  let store: Store<PledgeState>;
  const defaultPledge = {
    '0x1234567890123456789012345678901234567890': {
      collateral: 10,
      debt: 5,
    },
  };
  const paramOfDefaultPledge = {
    owner: '0x1234567890123456789012345678901234567890',
    collateral: 10,
    debt: 5,
  };

  beforeEach(() => {
    store = createStore(reducer);
  });

  it('has correct initial state', () => {
    expect(store.getState()).toEqual({});
  });

  describe('fetchingMyPledge', () => {
    it('fetching My Pledges', () => {
      store.dispatch(fetchingMyPledge(paramOfDefaultPledge));
      expect(store.getState()).toEqual(defaultPledge);
    });
  });

  describe('depositCollateral', () => {
    beforeEach(() => {
      store.dispatch(fetchingMyPledge(paramOfDefaultPledge));
    });

    it('deposit Collateral', () => {
      store.dispatch(
        depositCollateral({
          owner: '0x1234567890123456789012345678901234567890',
          collateral: 10,
        })
      );
      expect(store.getState()).toEqual({
        '0x1234567890123456789012345678901234567890': {
          collateral: 20,
          debt: 5,
        },
      });
    });

    it('should be nothing if owner does not exist', () => {
      store.dispatch(
        depositCollateral({
          owner: '0x0000000000000000000000000000000000000000',
          collateral: 10,
        })
      );
      expect(store.getState()).toEqual(defaultPledge);
    });
  });

  describe('withdrawCollateral', () => {
    beforeEach(() => {
      store.dispatch(fetchingMyPledge(paramOfDefaultPledge));
    });

    it('withdraw Collateral', () => {
      store.dispatch(
        withdrawCollateral({
          owner: '0x1234567890123456789012345678901234567890',
          collateral: 10,
        })
      );
      expect(store.getState()).toEqual({
        '0x1234567890123456789012345678901234567890': {
          collateral: 0,
          debt: 5,
        },
      });
    });

    it('should be nothing if owner does not exist', () => {
      store.dispatch(
        withdrawCollateral({
          owner: '0x0000000000000000000000000000000000000000',
          collateral: 10,
        })
      );
      expect(store.getState()).toEqual(defaultPledge);
    });
  });
});
