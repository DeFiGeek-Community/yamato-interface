import { useEffect, useCallback } from 'react';
import { useCurvePoolContract } from '../../hooks/useContract';
import useInterval from '../../hooks/useInterval';
import { useActiveWeb3React } from '../../hooks/web3';
import { fetchCjpyPriceFromCurve } from '../../utils/fetchState/fetchCjpyPriceFromCurve';
import { rateOfEthJpy } from '../mockData';
import { useFetchRateOfCjpyEth } from './hooks';

const isUseMock = process.env.REACT_APP_USE_MOCK
  ? JSON.parse(process.env.REACT_APP_USE_MOCK)
  : false;

// Data except Ethereum
export default function Updater(): null {
  const { chainId } = useActiveWeb3React();
  const curvePoolContract = useCurvePoolContract();
  const dispatchFetchRateOfCjpyEth = useFetchRateOfCjpyEth();

  const updateRates = useCallback(() => {
    if (isUseMock) {
      dispatchFetchRateOfCjpyEth('uniswap(v3)', rateOfEthJpy);
      dispatchFetchRateOfCjpyEth('uniswap(v2)', rateOfEthJpy);
    } else {
      fetchCjpyPriceFromCurve(curvePoolContract).then((data) =>
        dispatchFetchRateOfCjpyEth('Curve', data)
      );
    }
  }, [curvePoolContract, dispatchFetchRateOfCjpyEth]);

  useInterval(updateRates, 60000, true);

  useEffect(() => {
    updateRates();
  }, [chainId, updateRates]);

  return null;
}