import { createAction } from '@reduxjs/toolkit';

export const fetchingEthRate = createAction<{
  rate: number;
}>('market/fetchingEthRate');
