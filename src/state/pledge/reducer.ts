import { createReducer } from '@reduxjs/toolkit';
import {
  borrowDebt,
  depositCollateral,
  fetchMyPledge,
  repayDebt,
  withdrawCollateral,
} from './actions';

/**
 * Own Pledge State in Yamato Contract
 */
export type PledgeDetail = {
  collateral: number; // ETH
  debt: number; // CJPY
  withdrawalLockDate: number; // unix time
};
export interface PledgeState {
  [owner: string]: PledgeDetail;
}

const initialState: PledgeState = {};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(
      fetchMyPledge,
      (state, { payload: { owner, collateral, debt, withdrawalLockDate } }) => {
        state[owner] = { collateral, debt, withdrawalLockDate };
      }
    )
    .addCase(depositCollateral, (state, { payload: { owner, collateral } }) => {
      if (state[owner] == null || owner === '') {
        return state;
      }
      state[owner].collateral = state[owner].collateral + collateral;
    })
    .addCase(
      withdrawCollateral,
      (state, { payload: { owner, collateral } }) => {
        if (state[owner] == null || owner === '') {
          return state;
        }
        state[owner].collateral = state[owner].collateral - collateral;
      }
    )
    .addCase(borrowDebt, (state, { payload: { owner, debt } }) => {
      if (state[owner] == null || owner === '') {
        return state;
      }
      state[owner].debt = state[owner].debt + debt;
    })
    .addCase(repayDebt, (state, { payload: { owner, debt } }) => {
      if (state[owner] == null || owner === '') {
        return state;
      }
      state[owner].debt = state[owner].debt - debt;
    })
);
