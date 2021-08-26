import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useActiveWeb3React } from '../../hooks/web3';
import { AppDispatch, AppState } from '../index';
import {
  borrowDebt,
  depositCollateral,
  fetchMyPledge,
  repayDebt,
  withdrawCollateral,
} from './actions';
import { PledgeDetail } from './reducer';

/**
 * selector
 */
export function usePledgeData(): PledgeDetail {
  const { account } = useActiveWeb3React();
  return useSelector((state: AppState) => {
    if (!account) {
      return {
        collateral: 0,
        debt: 0,
        withdrawalLockDate: 0,
      };
    }
    return state.pledge[account];
  });
}

/**
 * dispatcher
 */
export function useFetchMyPledge() {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(
    (
      account: string,
      collateral: number,
      debt: number,
      withdrawalLockDate: number
    ) =>
      dispatch(
        fetchMyPledge({
          owner: account,
          collateral,
          debt,
          withdrawalLockDate,
        })
      ),
    [dispatch]
  );
}
export function useDepositCollateral() {
  const dispatch = useDispatch<AppDispatch>();
  const { account } = useActiveWeb3React();
  return useCallback(
    (collateral: number) =>
      dispatch(depositCollateral({ owner: account ?? '', collateral })),
    [dispatch, account]
  );
}
export function useWithdrawCollateral() {
  const dispatch = useDispatch<AppDispatch>();
  const { account } = useActiveWeb3React();
  return useCallback(
    (collateral: number) =>
      dispatch(withdrawCollateral({ owner: account ?? '', collateral })),
    [dispatch, account]
  );
}
export function useBorrowDebt() {
  const dispatch = useDispatch<AppDispatch>();
  const { account } = useActiveWeb3React();
  return useCallback(
    (debt: number) => dispatch(borrowDebt({ owner: account ?? '', debt })),
    [dispatch, account]
  );
}
export function useRepayDebt() {
  const dispatch = useDispatch<AppDispatch>();
  const { account } = useActiveWeb3React();
  return useCallback(
    (debt: number) => dispatch(repayDebt({ owner: account ?? '', debt })),
    [dispatch, account]
  );
}
