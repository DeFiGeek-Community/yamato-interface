import { createReducer } from '@reduxjs/toolkit';
import {
  depositCollateral,
  fetchingMyPledge,
  withdrawCollateral,
} from './actions';

export interface PledgeState {
  [owner: string]: {
    collateral: number;
    debt: number;
  };
}

const initialState: PledgeState = {};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(
      fetchingMyPledge,
      (state, { payload: { owner, collateral, debt } }) => {
        state[owner] = { collateral, debt };
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
