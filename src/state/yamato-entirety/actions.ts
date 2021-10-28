import { createAction } from '@reduxjs/toolkit';
import { YamatoEntiretyState } from './reducer';

export const fetchYamatoState = createAction<
  {
    [key in keyof Pick<
      YamatoEntiretyState,
      'lending' | 'pledges' | 'pool' | 'parameter'
    >]: key extends 'pool'
      ? Omit<
          YamatoEntiretyState[key],
          'prevRedemptionReserve' | 'prevSweepReserve'
        >
      : YamatoEntiretyState[key];
  }
>('yamato-entirety/fetchYamatoState');

export const fetchTokenState = createAction<YamatoEntiretyState['token']>(
  'yamato-entirety/fetchTokenState'
);

export const fetchRateOfEthJpy = createAction<{
  rateOfEthJpy: YamatoEntiretyState['rateOfEthJpy'];
}>('yamato-entirety/fetchRateOfEthJpy');

export const fetchEvents = createAction<{
  events: YamatoEntiretyState['events'];
}>('yamato-entirety/fetchEvents');

export const reset = createAction('yamato-entirety/reset');
