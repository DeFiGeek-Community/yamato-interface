import { createAction } from '@reduxjs/toolkit';

export const fetchYamatoState = createAction<{
  totalCollateral: number;
  totalDebt: number;
  tcr: number;
  redemptionReserve: number;
  sweepReserve: number;
}>('yamato-entirety/fetchYamatoState');

export const fetchRateOfEthJpy = createAction<{
  rateOfEthJpy: number;
}>('yamato-entirety/fetchRateOfEthJpy');
