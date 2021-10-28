import { createAction } from '@reduxjs/toolkit';
import { PledgeState } from './reducer';

export const fetchMyPledge = createAction<PledgeState['list']>(
  'pledge/fetchMyPledge'
);

export const reset = createAction('pledge/reset');
