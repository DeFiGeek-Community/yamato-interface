import { createAction } from '@reduxjs/toolkit';

export const fetchingMyPledge = createAction<{
  owner: string;
  collateral: number;
  debt: number;
}>('pledge/fetchingMyPledge');
export const depositCollateral = createAction<{
  owner: string;
  collateral: number;
}>('pledge/depositCollateral');
export const withdrawCollateral = createAction<{
  owner: string;
  collateral: number;
}>('pledge/withdrawCollateral');
