import { createAction } from '@reduxjs/toolkit';

export const fetchingEthRate = createAction<{
  rateOfEthJpy: number;
}>('yamato-entirety/fetchingEthRate');
