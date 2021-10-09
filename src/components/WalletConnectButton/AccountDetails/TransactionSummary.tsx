import { LOG_EVENT_NAME, YAMATO_SYMBOL } from '../../../constants/yamato';
import {
  ApproveTransactionInfo,
  BorrowTransactionInfo,
  DepositTransactionInfo,
  RepayTransactionInfo,
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

function ApprovalSummary({ info }: { info: ApproveTransactionInfo }) {
  // const token = useToken(info.tokenAddress);

  // return <>Approve {token?.symbol}</>;
  return <>Approve</>;
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

    case TransactionType.APPROVAL:
      return <ApprovalSummary info={info} />;
  }
}
