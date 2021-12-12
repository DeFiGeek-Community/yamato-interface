import { useMemo } from 'react';
import { REVERT_REASON_DESCRIPTION } from '../../constants/yamato';
import { TransactionType } from '../../state/transactions/actions';
import { useTransactionAdder } from '../../state/transactions/hooks';
import { BIGNUMBER_ZERO } from '../../utils/web3';
import { parseEther } from '../../utils/web3';
import { useYamatoMainContract } from '../useContract';
import { useActiveWeb3React } from '../web3';
import {
  CallbackState,
  getErrorMessage,
  estimateGas,
  InvalidCallback,
} from './helper';

export function useDepositCallback(): {
  // signatureData: SignatureData | undefined | null  FIXME: EIP-2612
  state: CallbackState;
  callback: null | ((eth: number) => Promise<string>);
  error: string | null;
} {
  const { account, chainId, library } = useActiveWeb3React();

  const yamatoMainContract = useYamatoMainContract();
  const addTransaction = useTransactionAdder();

  return useMemo(() => {
    if (!library || !account || !chainId || !yamatoMainContract) {
      return InvalidCallback;
    }

    return {
      state: CallbackState.VALID,
      callback: async function onDeposit(eth: number): Promise<string> {
        // payload
        const value = parseEther(eth.toString());
        if (value.eq(BIGNUMBER_ZERO)) {
          throw new Error(REVERT_REASON_DESCRIPTION.zeroInput);
        }
        const tx = {
          from: account,
          value,
        };

        const signer = yamatoMainContract.connect(library.getSigner());

        // estimate gas
        const call = await estimateGas('deposit', parseEther('0'), tx, signer);
        if ('error' in call) {
          throw new Error(call.error);
        }

        try {
          // send tx
          const params = { ...tx, gasLimit: call.gasEstimate };
          const response = await signer.deposit(params);

          // regist pending tx
          addTransaction(response, {
            type: TransactionType.DEPOSIT,
            value: eth,
          });

          return response.hash;
        } catch (error: any) {
          throw new Error(getErrorMessage('deposit', error));
        }
      },
      error: null,
    };
  }, [library, account, chainId, yamatoMainContract, addTransaction]);
}
