import { TransactionResponse } from '@ethersproject/providers';
import { useCallback, useMemo } from 'react';
import { useActiveWeb3React } from '../../hooks/web3';
import { useAppDispatch, useAppSelector } from '../hooks';

import { addTransaction, TransactionInfo } from './actions';
import { TransactionDetails } from './reducer';

// helper that can take a ethers library transaction response and add it to the list of transactions
export function useTransactionAdder(): (
  response: TransactionResponse,
  info: TransactionInfo
) => void {
  const { chainId, account } = useActiveWeb3React();
  const dispatch = useAppDispatch();

  return useCallback(
    (response: TransactionResponse, info: TransactionInfo) => {
      if (!account) return;
      if (!chainId) return;

      const { hash } = response;
      if (!hash) {
        throw Error('No transaction hash found.');
      }
      dispatch(addTransaction({ hash, from: account, info, chainId }));
    },
    [dispatch, chainId, account]
  );
}

// returns all the transactions for the current chain
export function useAllTransactions(): { [txHash: string]: TransactionDetails } {
  const { chainId } = useActiveWeb3React();

  const state = useAppSelector((state) => state.transactions);

  return chainId ? state[chainId] ?? {} : {};
}

export function useTransaction(
  transactionHash?: string
): TransactionDetails | undefined {
  const allTransactions = useAllTransactions();

  if (!transactionHash) {
    return undefined;
  }

  return allTransactions[transactionHash];
}

export function useIsTransactionPending(transactionHash?: string): boolean {
  const transactions = useAllTransactions();

  if (!transactionHash || !transactions[transactionHash]) return false;

  return !transactions[transactionHash].receipt;
}

export function useIsTransactionConfirmed(transactionHash?: string): boolean {
  const transactions = useAllTransactions();

  if (!transactionHash || !transactions[transactionHash]) return false;

  return Boolean(transactions[transactionHash].receipt);
}

/**
 * Returns whether a transaction happened in the last day (86400 seconds * 1000 milliseconds / second)
 * @param tx to check for recency
 */
export function isTransactionRecent(tx: TransactionDetails): boolean {
  return new Date().getTime() - tx.addedTime < 86_400_000;
}

// returns whether a token has a pending approval transaction
export function useHasPendingApproval(
  tokenAddress: string | undefined,
  spender: string | undefined
): boolean {
  const allTransactions = useAllTransactions();
  return useMemo(
    () =>
      typeof tokenAddress === 'string' &&
      typeof spender === 'string' &&
      Object.keys(allTransactions).some((hash) => {
        const tx = allTransactions[hash];
        return !!tx;
      }),
    [allTransactions, spender, tokenAddress]
  );
}
