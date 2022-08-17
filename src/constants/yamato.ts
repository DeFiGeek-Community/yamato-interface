import { UseToastOptions } from '@chakra-ui/toast';
import { LogEventType } from '../state/yamato-entirety/reducer';

export const YAMATO_SYMBOL = {
  COLLATERAL: 'ETH',
  YEN: 'CJPY',
  GOVERNANCE: 'YMT',
  GOVERNANCE_LOCK: 'veYMT',
  TXJP: 'TXJP',
};

export const LOG_EVENT_NAME: {
  [eventType in LogEventType]: string;
} = {
  deposit: '預入',
  withdrawal: '引出',
  borrowing: '借入',
  repay: '返済',
  governance_lock: 'YMTロック',
  governance_extension: 'YMT延長',
  governance_withdrawal: 'YMT引出',
  self_redemption: '償還',
  core_redemption: 'Yamato償還',
  sweep: 'Yamato代位弁済',
};

export const REVERT_REASON_DESCRIPTION = {
  // yamato
  default: 'Unknown error occurred',
  depositShortage: 'Collateral is insufficient',
  transferFailure: 'Transfer failed within the contract.',
  underMCR: 'Below the minimum collateral rate.',
  withdrawLock: 'Withdraw is locked.',
  notFlashLoan: 'This operation cannot be performed on the same block.',
  nonPledge: 'The pledge has not yet been made.',
  noSweepReserve: 'Liquidation Pool is empty.',
  noRedeemablePledge: 'There is no redeemable pledge.',
  noSweepablePledge: 'There is no pledge that can be repaid.',
  zeroRepay: 'The repayment volume is 0.',
  overDebt: 'The repayment volume exceeds the borrow balance.',
  overBalance: 'The specified amount exceeds the balance held.',
  zeroFee: 'The commission fee is zero.',
  insufficientBorrowing: 'Fees exceed the amount borrowed.',
  // authority
  notGoverner: 'You are not a governor.',
  notTester: 'You are not a tester.',
  // others
  justReverted: 'An unknown error has occurred. Or please switch networks.',
  walletRejected: 'Transmission has been canceled.',
  zeroInput: 'Input value is 0. Or too small.',
};

export const ErrorToastConfig: UseToastOptions = {
  title: 'Transaction failed',
  status: 'error',
  duration: 15000,
  position: 'top',
  isClosable: true,
};

export const MIN_COLLATERAL = 0.1;
