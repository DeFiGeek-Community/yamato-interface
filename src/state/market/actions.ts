import { createAction } from '@reduxjs/toolkit';
import { PriceSource } from './reducer';

export const fetchRateOfCjpyJpy = createAction<{
  source: PriceSource;
  rateOfCjpyJpy: number;
}>('market/fetchRateOfCjpyJpy');
