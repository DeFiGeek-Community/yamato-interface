import { createAction } from '@reduxjs/toolkit';
import { PledgeDetail } from './reducer';

export const fetchMyPledge = createAction<
  {
    owner: string;
  } & PledgeDetail
>('pledge/fetchMyPledge');
