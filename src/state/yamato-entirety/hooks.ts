import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEthChangePercent } from '../../utils/prices';
import { AppDispatch, AppState } from '../index';
import {
  fetchEvents,
  fetchRateOfEthJpy,
  fetchTokenState,
  fetchYamatoState,
} from './actions';
import { LogEvent } from './reducer';

/**
 * selector
 */
export function useYamatoStateForDashboard() {
  return useSelector((state: AppState) => {
    return {
      totalSupplyOfCjpy: state.yamatoEntirety.token.cjpy.totalSupply,
      tvl: state.yamatoEntirety.lending.tvl,
      tcr: state.yamatoEntirety.lending.tcr,
      rateOfEthJpy: state.yamatoEntirety.rateOfEthJpy,
      ethChangePercent: getEthChangePercent(
        state.yamatoEntirety.rateOfEthJpy,
        state.yamatoEntirety.prevRateOfEthJpy
      ),
    };
  });
}
export function useYamatoStateForPledge() {
  return useSelector((state: AppState) => ({
    totalCollateral: state.yamatoEntirety.lending.totalCollateral,
    totalDebt: state.yamatoEntirety.lending.totalDebt,
    tcr: state.yamatoEntirety.lending.tcr,
    rateOfEthJpy: state.yamatoEntirety.rateOfEthJpy,
    redemptionReserve: state.yamatoEntirety.pool.redemptionReserve,
    sweepReserve: state.yamatoEntirety.pool.sweepReserve,
    sweepableCandiate: state.yamatoEntirety.pool.sweepableCandiate,
  }));
}
export function useYamatoStateForWorld() {
  return useSelector((state: AppState) => ({
    events: state.yamatoEntirety.events,
  }));
}

/**
 * dispatcher
 */
export function useFetchYamatoState() {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(
    (
      totalCollateral: number,
      totalDebt: number,
      tvl: number,
      tcr: number,
      redemptionReserve: number,
      sweepReserve: number,
      sweepableCandiate: number
    ) =>
      dispatch(
        fetchYamatoState({
          totalCollateral,
          totalDebt,
          tvl,
          tcr,
          redemptionReserve,
          sweepReserve,
          sweepableCandiate,
        })
      ),
    [dispatch]
  );
}
export function useFetchTokenState() {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(
    (args: {
      cjpy: { totalSupply: number };
      ymt: { totalSupply: number };
      veYmt: { totalSupply: number; boostRate: number };
    }) => {
      dispatch(fetchTokenState(args));
    },
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
export function useFetchEvents() {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(
    (events: LogEvent[]) => dispatch(fetchEvents({ events })),
    [dispatch]
  );
}
