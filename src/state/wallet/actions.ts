import { createAction } from '@reduxjs/toolkit';

export const fetchWallet = createAction<{
  cjpy: number;
  eth: number;
}>('wallet/fetchWallet');
