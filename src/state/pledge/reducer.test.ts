import { Store, createStore } from '@reduxjs/toolkit';
import {
  borrowDebt,
  depositCollateral,
  fetchMyPledge,
  repayDebt,
  withdrawCollateral,
} from './actions';
import reducer, { PledgeState } from './reducer';

describe('pledge reducer', () => {
  let store: Store<PledgeState>;
  const nonExistingOwner = '0x0000000000000000000000000000000000000000';
  const defaultOwner = '0x1234567890123456789012345678901234567890';
  const defalutPledgeDetail = {
    collateral: 10,
    debt: 5,
    withdrawalLockDate: 0,
  };
  const defaultPledge = {
    [defaultOwner]: defalutPledgeDetail,
  };
  const paramOfDefaultPledge = {
    owner: defaultOwner,
    collateral: 10,
    debt: 5,
    withdrawalLockDate: 0,
  };

  beforeEach(() => {
    store = createStore(reducer);
  });

  it('has correct initial state', () => {
    expect(store.getState()).toEqual({});
  });

  describe('fetchMyPledge', () => {
    it('fetch My Pledges', () => {
      store.dispatch(fetchMyPledge(paramOfDefaultPledge));
      expect(store.getState()).toEqual(defaultPledge);
    });
  });

  describe('depositCollateral', () => {
    beforeEach(() => {
      store.dispatch(fetchMyPledge(paramOfDefaultPledge));
    });

    it('deposit Collateral', () => {
      store.dispatch(
        depositCollateral({
          owner: defaultOwner,
          collateral: 10,
        })
      );
      expect(store.getState()).toEqual({
        [defaultOwner]: {
          ...defalutPledgeDetail,
          collateral: 20,
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
      store.dispatch(fetchMyPledge(paramOfDefaultPledge));
    });

    it('withdraw Collateral', () => {
      store.dispatch(
        withdrawCollateral({
          owner: defaultOwner,
          collateral: 10,
        })
      );
      expect(store.getState()).toEqual({
        [defaultOwner]: {
          ...defalutPledgeDetail,
          collateral: 0,
        },
      });
    });

    it('should be nothing if owner does not exist', () => {
      store.dispatch(
        withdrawCollateral({
          owner: nonExistingOwner,
          collateral: 10,
        })
      );
      expect(store.getState()).toEqual(defaultPledge);
    });
  });

  describe('borrowDebt', () => {
    beforeEach(() => {
      store.dispatch(fetchMyPledge(paramOfDefaultPledge));
    });

    it('borrow Debt', () => {
      store.dispatch(
        borrowDebt({
          owner: defaultOwner,
          debt: 10,
        })
      );
      expect(store.getState()).toEqual({
        [defaultOwner]: {
          ...defalutPledgeDetail,
          debt: 15,
        },
      });
    });

    it('should be nothing if owner does not exist', () => {
      store.dispatch(
        borrowDebt({
          owner: nonExistingOwner,
          debt: 10,
        })
      );
      expect(store.getState()).toEqual(defaultPledge);
    });
  });

  describe('repayDebt', () => {
    beforeEach(() => {
      store.dispatch(fetchMyPledge(paramOfDefaultPledge));
    });

    it('repay Debt', () => {
      store.dispatch(
        repayDebt({
          owner: defaultOwner,
          debt: 5,
        })
      );
      expect(store.getState()).toEqual({
        [defaultOwner]: {
          ...defalutPledgeDetail,
          debt: 0,
        },
      });
    });

    it('should be nothing if owner does not exist', () => {
      store.dispatch(
        repayDebt({
          owner: nonExistingOwner,
          debt: 5,
        })
      );
      expect(store.getState()).toEqual(defaultPledge);
    });
  });
});
