import { createAction } from '@reduxjs/toolkit';

export interface SerializableTransactionReceipt {
  to: string;
  from: string;
  contractAddress: string;
  transactionIndex: number;
  blockHash: string;
  transactionHash: string;
  blockNumber: number;
  status?: number;
}

/**
 * Be careful adding to this enum, always assign a unique value (typescript will not prevent duplicate values).
 * These values is persisted in state and if you change the value it will cause errors
 */
export enum TransactionType {
  APPROVAL = 0,
  DEPOSIT = 1,
  WITHDRAW = 2,
  BORROW = 3,
  REPAY = 4,
}

export interface BaseTransactionInfo {
  type: TransactionType;
}

export interface DepositTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.DEPOSIT;
  value: number;
}

export interface WithdrawTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.WITHDRAW;
  value: number;
}

export interface BorrowTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.BORROW;
  value: number;
}

export interface RepayTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.REPAY;
  value: number;
}

export interface ApproveTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.APPROVAL;
  tokenAddress: string;
  spender: string;
}

export type TransactionInfo =
  | DepositTransactionInfo
  | WithdrawTransactionInfo
  | BorrowTransactionInfo
  | RepayTransactionInfo
  | ApproveTransactionInfo;

export const addTransaction = createAction<{
  chainId: number;
  hash: string;
  from: string;
  info: TransactionInfo;
}>('transactions/addTransaction');
export const clearAllTransactions = createAction<{ chainId: number }>(
  'transactions/clearAllTransactions'
);
export const finalizeTransaction = createAction<{
  chainId: number;
  hash: string;
  receipt: SerializableTransactionReceipt;
}>('transactions/finalizeTransaction');
export const checkedTransaction = createAction<{
  chainId: number;
  hash: string;
  blockNumber: number;
}>('transactions/checkedTransaction');
