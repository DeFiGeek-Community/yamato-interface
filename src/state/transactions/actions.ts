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
  DEPOSIT = 0,
  WITHDRAW = 1,
  BORROW = 2,
  REPAY = 3,
  SELF_REDEEM = 4,
  CORE_REDEEM = 5,
  SWEEP = 6,
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

export interface SelfRedeemTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.SELF_REDEEM;
  value: number;
  expected: number;
}

export interface CoreRedeemTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.CORE_REDEEM;
  expected: number;
}

export interface SweepTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.SWEEP;
  expected: number;
}

export type TransactionInfo =
  | DepositTransactionInfo
  | WithdrawTransactionInfo
  | BorrowTransactionInfo
  | RepayTransactionInfo
  | SelfRedeemTransactionInfo
  | CoreRedeemTransactionInfo
  | SweepTransactionInfo;

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
