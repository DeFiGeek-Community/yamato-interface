import { UseToastOptions } from '@chakra-ui/toast';
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
  deposit: '預入',
  withdrawal: '引出',
  borrowing: '借入',
  repay: '返済',
  governance_lock: 'YMTロック',
  governance_extension: 'YMT延長',
  governance_withdrawal: 'YMT引出',
  self_redemption: '自己償還',
  yamato_redemption: 'Yamato償還',
  yamato_sweep: 'Yamato代位弁済',
};

export const REVERT_REASON_DESCRIPTION = {
  depositShortage: '担保が不足しています。',
  transferFailure: 'コントラクトで転送に失敗しました。',
  underMCR: '最低担保率を下回ります。',
  withdrawLock: '引き出しがロックされています。',
  notFlashLoan: '借入は預入と同じブロックではできません。',
  nonPledge: 'まだpledgeが作られていません。',
  zeroRepay: '返済量が0です。',
  surplusRepay: '返済量が借入量より上回っています。',
  zeroFee: '手数料が0になっています。',
  insufficientBorrowing: '手数料が借入量より上回っています。',
};

export const ErrorToastConfig: UseToastOptions = {
  title: 'トランザクションが失敗しました',
  status: 'error',
  duration: 15000,
  position: 'top',
  isClosable: true,
};
