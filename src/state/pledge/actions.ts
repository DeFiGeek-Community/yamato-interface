import { createAction } from '@reduxjs/toolkit';
import { PledgeState } from './reducer';

export const fetchMyPledge = createAction<PledgeState>('pledge/fetchMyPledge');
