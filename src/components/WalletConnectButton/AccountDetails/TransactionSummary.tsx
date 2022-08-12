import { useTranslation } from 'react-i18next';
import { LOG_EVENT_NAME, YAMATO_SYMBOL } from '../../../constants/yamato';
import {
  BorrowTransactionInfo,
  CoreRedeemTransactionInfo,
  DepositTransactionInfo,
  RepayTransactionInfo,
  SelfRedeemTransactionInfo,
  SweepTransactionInfo,
  TransactionInfo,
  TransactionType,
  WithdrawTransactionInfo,
} from '../../../state/transactions/actions';

function DepositSummary({ info }: { info: DepositTransactionInfo }) {
  return (
    <>
      {LOG_EVENT_NAME.deposit} {info.value} {YAMATO_SYMBOL.COLLATERAL}
    </>
  );
}
function WithdrawSummary({ info }: { info: WithdrawTransactionInfo }) {
  return (
    <>
      {LOG_EVENT_NAME.withdrawal} {info.value} {YAMATO_SYMBOL.COLLATERAL}
    </>
  );
}
function BorrowSummary({ info }: { info: BorrowTransactionInfo }) {
  return (
    <>
      {LOG_EVENT_NAME.borrowing} {info.value} {YAMATO_SYMBOL.YEN}
    </>
  );
}
function RepaySummary({ info }: { info: RepayTransactionInfo }) {
  return (
    <>
      {LOG_EVENT_NAME.repay} {info.value} {YAMATO_SYMBOL.YEN}
    </>
  );
}
function SelfRedeemSummary({ info }: { info: SelfRedeemTransactionInfo }) {
  const { t } = useTranslation();
  return (
    <>
      {LOG_EVENT_NAME.self_redemption} {info.value} {YAMATO_SYMBOL.YEN}{' '}
      {t('walletConnectButton.accountDetails.predictedGain')} {info.expected}{' '}
      {YAMATO_SYMBOL.COLLATERAL}
    </>
  );
}
function CoreRedeemSummary({ info }: { info: CoreRedeemTransactionInfo }) {
  const { t } = useTranslation();
  return (
    <>
      {LOG_EVENT_NAME.core_redemption}{' '}
      {t('walletConnectButton.accountDetails.predictedGain')} {info.expected}{' '}
      {YAMATO_SYMBOL.COLLATERAL}
    </>
  );
}
function SweepSummary({ info }: { info: SweepTransactionInfo }) {
  const { t } = useTranslation();
  return (
    <>
      {LOG_EVENT_NAME.sweep}{' '}
      {t('walletConnectButton.accountDetails.predictedGain')} {info.expected}{' '}
      {YAMATO_SYMBOL.YEN}
    </>
  );
}

export function TransactionSummary({ info }: { info: TransactionInfo }) {
  switch (info.type) {
    case TransactionType.DEPOSIT:
      return <DepositSummary info={info} />;
    case TransactionType.WITHDRAW:
      return <WithdrawSummary info={info} />;
    case TransactionType.BORROW:
      return <BorrowSummary info={info} />;
    case TransactionType.REPAY:
      return <RepaySummary info={info} />;
    case TransactionType.SELF_REDEEM:
      return <SelfRedeemSummary info={info} />;
    case TransactionType.CORE_REDEEM:
      return <CoreRedeemSummary info={info} />;
    case TransactionType.SWEEP:
      return <SweepSummary info={info} />;
  }
}
