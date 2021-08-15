import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../index';
import { fetchingEthRate } from './actions';

export function useYamatoStateForPledge(): { rateOfEthJpy: number } {
  return useSelector((state: AppState) => ({
    rateOfEthJpy: state.yamatoEntirety.rateOfEthJpy,
  }));
}

export function useFetchingEthRate(): (rateOfEthJpy: number) => void {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(
    (rateOfEthJpy: number) => dispatch(fetchingEthRate({ rateOfEthJpy })),
    [dispatch]
  );
}
