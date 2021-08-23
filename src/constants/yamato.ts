import { LogEventType } from '../state/yamato-entirety/reducer';

export const YAMATO_SYMBOL = {
  COLLATERAL: 'ETH',
  YEN: 'CJPY',
  GOVERNANCE: 'YMT',
  GOVERNANCE_LOCK: 'veYMT',
};

export const LOG_EVENT_NAME: {
  [eventType in LogEventType]: string;
} = {
  deposit: '担保預入',
  withdrawal: '担保引出',
  borrowing: '借入',
  repay: '返済',
  governance_lock: 'YMTロック',
  governance_extension: 'YMT延長',
  governance_withdrawal: 'YMT引出',
  self_redemption: '自己償還',
  yamato_redemption: 'Yamato償還',
  yamato_sweep: 'Yamato代位弁済',
};

// TODO: Get from Yamato Contract and move to state.
export const MCR = 110; // MinimumCollateralizationRatio
export const RRR = 80; // RedemptionReserveRate
export const SRR = 20; // SweepReserveRate
export const GRR = 1; // GasReserveRate
