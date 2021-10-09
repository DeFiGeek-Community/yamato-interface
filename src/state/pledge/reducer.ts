import { createReducer } from '@reduxjs/toolkit';
import { fetchMyPledge } from './actions';

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
  builder.addCase(
    fetchMyPledge,
    (state, { payload: { owner, collateral, debt, withdrawalLockDate } }) => {
      state[owner] = { collateral, debt, withdrawalLockDate };
    }
  )
);
