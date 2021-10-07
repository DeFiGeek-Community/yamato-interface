import { createAction } from '@reduxjs/toolkit';
import { LogEvent } from './reducer';

export const fetchYamatoState = createAction<{
  lending: {
    totalCollateral: number;
    totalDebt: number;
    tvl: number;
    tcr: number;
  };
  pool: {
    redemptionReserve: number;
    sweepReserve: number;
    sweepableCandiate: number;
  };
  parameter: {
    MCR: number;
    RRR: number;
    SRR: number;
    GRR: number;
  };
}>('yamato-entirety/fetchYamatoState');

export const fetchTokenState = createAction<{
  cjpy: { totalSupply: number };
  ymt: { totalSupply: number };
  veYmt: { totalSupply: number; boostRate: number };
}>('yamato-entirety/fetchTokenState');

export const fetchRateOfEthJpy = createAction<{
  rateOfEthJpy: number;
}>('yamato-entirety/fetchRateOfEthJpy');

export const fetchEvents = createAction<{
  events: LogEvent[];
}>('yamato-entirety/fetchEvents');
