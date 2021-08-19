import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../index';
import { fetchRateOfCjpyJpy } from './actions';
import { PriceSource } from './reducer';

export function useMarketState() {
  return useSelector((state: AppState) => ({
    rateOfCjpyJpy: state.market.rateOfCjpyJpy,
  }));
}

export function useFetchRateOfCjpyJpy() {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(
    (source: PriceSource, rateOfCjpyJpy: number) =>
      dispatch(fetchRateOfCjpyJpy({ source, rateOfCjpyJpy })),
    [dispatch]
  );
}
