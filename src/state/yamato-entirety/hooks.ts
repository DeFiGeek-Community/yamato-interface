import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../index';
import { fetchRateOfEthJpy, fetchYamatoState } from './actions';

export function useYamatoStateForPledge() {
  return useSelector((state: AppState) => ({
    totalCollateral: state.yamatoEntirety.totalCollateral,
    totalDebt: state.yamatoEntirety.totalDebt,
    tcr: state.yamatoEntirety.tcr,
    rateOfEthJpy: state.yamatoEntirety.rateOfEthJpy,
  }));
}

export function useFetchYamatoState() {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(
    (totalCollateral: number, totalDebt: number, tcr: number) =>
      dispatch(fetchYamatoState({ totalCollateral, totalDebt, tcr })),
    [dispatch]
  );
}
export function useFetchRateOfEthJpy() {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(
    (rateOfEthJpy: number) => dispatch(fetchRateOfEthJpy({ rateOfEthJpy })),
    [dispatch]
  );
}
