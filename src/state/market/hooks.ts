import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../index';
import { fetchingEthRate } from './actions';

export function useMarketDataForPledge(): { rate: number } {
  return useSelector((state: AppState) => ({
    rate: state.market.rate,
  }));
}

export function useFetchingEthRate(): (rate: number) => void {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(
    (rate: number) => dispatch(fetchingEthRate({ rate })),
    [dispatch]
  );
}
