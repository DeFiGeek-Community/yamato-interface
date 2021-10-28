import { createAction } from '@reduxjs/toolkit';
import { PriceSource } from './reducer';

export const fetchRateOfCjpyEth = createAction<{
  source: PriceSource;
  rateOfCjpyEth: number | null;
}>('market/fetchRateOfCjpyEth');
