import { BigNumber } from '@ethersproject/bignumber';
import { PopulatedTransaction } from '@ethersproject/contracts';
import { REVERT_REASON_DESCRIPTION } from '../../constants/yamato';
import { Yamato } from '../../infrastructures/abis/types';

type MethodName =
  | 'deposit'
  | 'withdraw'
  | 'borrow'
  | 'repay'
  | 'selfRedeem'
  | 'coreRedeem'
  | 'sweep';

export enum CallbackState {
  INVALID,
  LOADING,
  VALID,
}

export const InvalidCallback = {
  state: CallbackState.INVALID,
  callback: null,
  error: 'Missing dependencies',
};

/**
 * This is hacking out the revert reason from the ethers provider thrown error however it can.
 * This object seems to be undocumented by ethers.
 * @param error an error from the ethers provider
 */
function swapErrorToUserReadableMessage(error: any): string {
  let reason: string | undefined;
  while (Boolean(error)) {
    reason = error.reason ?? error.message ?? reason;
    error = error.error ?? error.data?.originalError;
  }

  if (reason?.indexOf('execution reverted: ') === 0)
    reason = reason.substr('execution reverted: '.length);

  switch (reason) {
    // deposit
    case 'transfer failed':
      return REVERT_REASON_DESCRIPTION.transferFailure;
    // withdraw
    case 'Withdrawal amount must be less than equal to the target coll amount.':
      return REVERT_REASON_DESCRIPTION.depositShortage;
    case 'Withdrawal amount must be less than equal to the total coll amount.':
      return REVERT_REASON_DESCRIPTION.depositShortage;
    case 'Withdrawal is being locked for this sender.':
      return REVERT_REASON_DESCRIPTION.withdrawLock;
    case 'Withdrawal failure: ICR is not more than MCR.':
      return REVERT_REASON_DESCRIPTION.underMCR;
    case "Withdrawal failure: ICR can't be less than MCR after withdrawal.":
      return REVERT_REASON_DESCRIPTION.underMCR;
    // borrow
    case 'Borrowing should not be executed within the same block with your deposit.':
      return REVERT_REASON_DESCRIPTION.notFlashLoan;
    case 'This pledge is not created yet.':
      return REVERT_REASON_DESCRIPTION.nonPledge;
    case 'This minting is invalid because of too large borrowing.':
      return REVERT_REASON_DESCRIPTION.underMCR;
    case 'fee must be more than zero.':
      return REVERT_REASON_DESCRIPTION.zeroFee;
    case '(borrow - fee) must be more than zero.':
      return REVERT_REASON_DESCRIPTION.insufficientBorrowing;
    case 'ICR too low to get fee data.':
      return REVERT_REASON_DESCRIPTION.underMCR;
    // repay
    case 'You are repaying no CJPY':
      return REVERT_REASON_DESCRIPTION.zeroRepay;
    case 'You are repaying more than you are owing.':
      return REVERT_REASON_DESCRIPTION.overDebt;
    case 'ERC20: burn amount exceeds balance':
      return REVERT_REASON_DESCRIPTION.overBalance;
    // redeem/sweep
    case 'No pledges are redeemed.':
      return REVERT_REASON_DESCRIPTION.noRedeemablePledge;
    case 'Sweep failure: sweep reserve is empty.':
      return REVERT_REASON_DESCRIPTION.noSweepReserve;
    case 'At least a pledge should be swept.':
      return REVERT_REASON_DESCRIPTION.noSweepablePledge;
    case 'Gas payback has been failed.':
      return REVERT_REASON_DESCRIPTION.insufficientPaybackGas;
    case "Can't expense zero pledge.":
      return REVERT_REASON_DESCRIPTION.depositShortage;
    // authority
    case 'You are not the governer.':
      return REVERT_REASON_DESCRIPTION.notGoverner;
    case 'You are not the tester.':
      return REVERT_REASON_DESCRIPTION.notTester;
    // others
    case 'execution reverted': // incorrect contract address, incorrect ABIs, etc.
      return REVERT_REASON_DESCRIPTION.justReverted;
    default:
      return `不明なエラーが発生しました${reason ? `: "${reason}"` : ''}. `;
  }
}

export function getErrorMessage(methodName: MethodName, error: any) {
  // if the user rejected the tx, pass this along
  if (error?.code === 4001) {
    return REVERT_REASON_DESCRIPTION.walletRejected;
  } else {
    // otherwise, the error was unexpected and we need to convey that
    console.error(`Yamato.${methodName} failed: `, error);

    return `Yamato.${methodName} failed: ${swapErrorToUserReadableMessage(
      error
    )}`;
  }
}

/**
 * @param value Set 0, if nothing.
 */
export function estimateGas(
  methodName: MethodName,
  value: BigNumber,
  option: PopulatedTransaction,
  signer: Yamato
) {
  let method: Promise<BigNumber> | null = null;
  switch (methodName) {
    case 'deposit':
      method = signer.estimateGas.deposit(option);
      break;
    case 'withdraw':
      method = signer.estimateGas.withdraw(value, option);
      break;
    case 'borrow':
      method = signer.estimateGas.borrow(value, option);
      break;
    case 'repay':
      method = signer.estimateGas.repay(value, option);
      break;
    case 'selfRedeem':
      method = signer.estimateGas.redeem(value, false, option);
      break;
    case 'coreRedeem':
      method = signer.estimateGas.redeem(value, true, option);
      break;
    case 'sweep':
      method = signer.estimateGas.sweep(option);
      break;
  }
  if (!method) {
    throw new Error('unexpected error');
  }

  return method
    .then((gasEstimate) => ({ gasEstimate: calculateGasMargin(gasEstimate) }))
    .catch((gasError) => {
      console.error(`Gas estimate failed in Yamato.${methodName}`);
      return { error: swapErrorToUserReadableMessage(gasError) };
    });
}

// add 20%
export function calculateGasMargin(value: BigNumber): BigNumber {
  // FIXME: make 3 multiple for debug
  return value.mul(BigNumber.from(10000 + 20000)).div(BigNumber.from(10000));
}
