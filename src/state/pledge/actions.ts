import { createAction } from '@reduxjs/toolkit';
import { PledgeDetail } from './reducer';

export const fetchMyPledge = createAction<
  {
    owner: string;
  } & PledgeDetail
>('pledge/fetchMyPledge');

export const depositCollateral = createAction<{
  owner: string;
  collateral: number;
}>('pledge/depositCollateral');
export const withdrawCollateral = createAction<{
  owner: string;
  collateral: number;
}>('pledge/withdrawCollateral');

export const borrowDebt = createAction<{
  owner: string;
  debt: number;
}>('pledge/borrowDebt');
export const repayDebt = createAction<{
  owner: string;
  debt: number;
}>('pledge/repayDebt');
