import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useActiveWeb3React } from '../../hooks/web3';
import { AppDispatch, AppState } from '../index';
import { fetchMyPledge } from './actions';
import { PledgeDetail, PledgeState } from './reducer';

/**
 * selector
 */
export function usePledgeData(): PledgeDetail['owner'] {
  const { account } = useActiveWeb3React();
  return useSelector((state: AppState) => {
    if (!account || !state.pledge.list[account.toLowerCase()]) {
      return {
        collateral: 0,
        debt: 0,
      };
    }
    return {
      ...state.pledge.list[account.toLowerCase()],
    };
  });
}

/**
 * dispatcher
 */
export function useFetchMyPledge() {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(
    (pledge: PledgeState['list']) => dispatch(fetchMyPledge(pledge)),
    [dispatch]
  );
}
