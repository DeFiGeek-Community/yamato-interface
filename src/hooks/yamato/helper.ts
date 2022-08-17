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

  const defaultMessage = `${REVERT_REASON_DESCRIPTION.default}${
    reason ? `: "${reason}"` : ''
  } `;

  switch (reason) {
    // Yamato.sol
    case "FlashLock.blockHeight can't be more than currenct blockheight.":
    case 'Invalid FlashLockTypes given.':
    case "Those can't be called in the same block.":
      return REVERT_REASON_DESCRIPTION.notFlashLoan;
    // YamatoDepositor.sol
    case 'transfer failed':
      return REVERT_REASON_DESCRIPTION.transferFailure;
    // YamatoWithdrawer.sol
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
    // YamatoBorrower.sol
    case 'This pledge is not created yet.':
      return REVERT_REASON_DESCRIPTION.nonPledge;
    case 'This minting is invalid because of too large borrowing.':
      return REVERT_REASON_DESCRIPTION.underMCR;
    case 'fee must be more than zero.':
      return REVERT_REASON_DESCRIPTION.zeroFee;
    case '(borrow - fee) must be more than zero.':
      return REVERT_REASON_DESCRIPTION.insufficientBorrowing;
    // YamatoRepayer.sol
    case 'You are repaying no Currency':
      return REVERT_REASON_DESCRIPTION.zeroRepay;
    case "You can't repay for a zero-debt pledge.":
    case 'You are trying to repay more than your debt.':
      return REVERT_REASON_DESCRIPTION.overDebt;
    case 'You are trying to repay more than you have.':
      return REVERT_REASON_DESCRIPTION.overBalance;
    // YamatoRedeemer.sol
    case 'You are redeeming more than the bearer has.':
      return REVERT_REASON_DESCRIPTION.overBalance;
    case 'No pledges are redeemed.':
      return REVERT_REASON_DESCRIPTION.noRedeemablePledge;
    case "Can't expense zero pledge.":
      return REVERT_REASON_DESCRIPTION.depositShortage;
    // YamatoSweeper.sol
    case 'Sweep failure: sweep reserve is empty.':
      return REVERT_REASON_DESCRIPTION.noSweepReserve;
    case 'At least a pledge should be swept.':
      return REVERT_REASON_DESCRIPTION.noSweepablePledge;
    // authority
    case 'You are not the governer.':
      return REVERT_REASON_DESCRIPTION.notGoverner;
    case 'You are not the tester.':
      return REVERT_REASON_DESCRIPTION.notTester;
    // others
    case 'execution reverted': // incorrect contract address, incorrect ABIs, etc.
      return REVERT_REASON_DESCRIPTION.justReverted;
    default:
      return defaultMessage;
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

// add 50%
export function calculateGasMargin(value: BigNumber): BigNumber {
  return value.mul(BigNumber.from(10000 + 5000)).div(BigNumber.from(10000));
}
