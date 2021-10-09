import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../index';
import { fetchWallet } from './actions';

/**
 * selector
 */
export function useWalletState() {
  return useSelector((state: AppState) => ({
    cjpy: state.wallet.cjpy,
    eth: state.wallet.eth,
  }));
}

/**
 * dispatcher
 */
export function useFetchWallet() {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(
    (cjpy: number, eth: number) => dispatch(fetchWallet({ cjpy, eth })),
    [dispatch]
  );
}
