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
  self_redemption: '償還',
  core_redemption: 'Yamato償還',
  sweep: 'Yamato代位弁済',
};

export const REVERT_REASON_DESCRIPTION = {
  // yamato
  depositShortage: '担保が不足しています。',
  transferFailure: 'コントラクトで転送に失敗しました。',
  underMCR: '最低担保率を下回ります。',
  withdrawLock: '引き出しがロックされています。',
  notFlashLoan: '借入は預入と同じブロックではできません。',
  nonPledge: 'まだpledgeが作られていません。',
  noSweepReserve: '弁済プールが空です。',
  noRedeemablePledge: '償還できるpledgeがありません。',
  noSweepablePledge: '弁済できるpledgeがありません。',
  zeroRepay: '返済量が0です。',
  surplusRepay: '返済量が借入量より上回っています。',
  exceedsBalanceRepay: '返済量が残高を超えています。',
  zeroFee: '手数料が0になっています。',
  insufficientBorrowing: '手数料が借入量より上回っています。',
  insufficientPaybackGas: '変換するためのガス代が不足しています。',
  // authority
  notGoverner: 'あなたはガバナーではありません。',
  notTester: 'あなたはテスターではありません。',
  // others
  justReverted:
    '不明なエラーが発生しました。またはネットワークを切り替えてください。',
  walletRejected: '送信を取り止めました。',
};

export const ErrorToastConfig: UseToastOptions = {
  title: 'トランザクションが失敗しました',
  status: 'error',
  duration: 15000,
  position: 'top',
  isClosable: true,
};
