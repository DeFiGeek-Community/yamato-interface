import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../index';
import { fetchRateOfCjpyEth } from './actions';
import { PriceSource } from './reducer';

/**
 * dispatcher
 */
export function useFetchRateOfCjpyEth() {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(
    (source: PriceSource, rateOfCjpyEth: number | null) =>
      dispatch(fetchRateOfCjpyEth({ source, rateOfCjpyEth })),
    [dispatch]
  );
}
