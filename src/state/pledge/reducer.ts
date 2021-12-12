import { createReducer } from '@reduxjs/toolkit';
import { fetchMyPledge, reset } from './actions';

/**
 * Own Pledge State in Yamato Contract
 */
export type PledgeDetail = {
  [owner: string]: {
    collateral: number; // ETH
    debt: number; // CJPY
  };
};
export interface PledgeState {
  list: PledgeDetail;
}

export const initialState: PledgeState = {
  list: {},
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(fetchMyPledge, (state, { payload }) => {
      if (Object.keys(payload)[0]) {
        state.list[Object.keys(payload)[0].toLowerCase()] =
          Object.values(payload)[0];
      }
    })
    .addCase(reset, () => initialState)
);
