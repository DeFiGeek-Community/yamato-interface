import { createReducer } from '@reduxjs/toolkit';
import {
  depositCollateral,
  fetchingMyPledge,
  withdrawCollateral,
} from './actions';

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
      fetchingMyPledge,
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
);
