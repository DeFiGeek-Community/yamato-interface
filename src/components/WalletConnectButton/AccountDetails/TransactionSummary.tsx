import { useTranslation } from 'react-i18next';
import { LOG_EVENT_NAME, YAMATO_SYMBOL } from '../../../constants/yamato';
import { useCurrency } from '../../../context/CurrencyContext';
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
  const { currency } = useCurrency();
  return (
    <>
      {LOG_EVENT_NAME.borrowing} {info.value} {currency}
    </>
  );
}
function RepaySummary({ info }: { info: RepayTransactionInfo }) {
  const { currency } = useCurrency();
  return (
    <>
      {LOG_EVENT_NAME.repay} {info.value} {currency}
    </>
  );
}
function SelfRedeemSummary({ info }: { info: SelfRedeemTransactionInfo }) {
  const { currency } = useCurrency();
  const { t } = useTranslation();
  return (
    <>
      {LOG_EVENT_NAME.self_redemption} {info.value} {currency}{' '}
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
  const { currency } = useCurrency();
  const { t } = useTranslation();
  return (
    <>
      {LOG_EVENT_NAME.sweep}{' '}
      {t('walletConnectButton.accountDetails.predictedGain')} {info.expected}{' '}
      {currency}
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
