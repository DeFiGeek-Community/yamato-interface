import { useCurvePoolContract } from '../../hooks/useContract';
import useInterval from '../../hooks/useInterval';
import { fetchCjpyPriceFromCurve } from '../../utils/fetchState/fetchCjpyPriceFromCurve';
// import { useActiveWeb3React } from '../../hooks/web3';
// import { fetchCjpyPriceFromUniswap } from '../../utils/fetchState/fetchCjpyPriceFromUniswap';

import { rateOfEthJpy } from '../mockData';
import { useFetchRateOfCjpyEth } from './hooks';

const isUseMock = process.env.REACT_APP_USE_MOCK
  ? JSON.parse(process.env.REACT_APP_USE_MOCK)
  : false;

// Data except Ethereum
export default function Updater(): null {
  // const { active, chainId } = useActiveWeb3React();
  const curvePoolContract = useCurvePoolContract();

  const dispatchFetchRateOfCjpyEth = useFetchRateOfCjpyEth();

  useInterval(
    () => {
      if (isUseMock) {
        dispatchFetchRateOfCjpyEth('uniswap(v3)', rateOfEthJpy);
        dispatchFetchRateOfCjpyEth('uniswap(v2)', rateOfEthJpy);
      } else {
        // Uniswap
        // fetchCjpyPriceFromUniswap('v3', chainId, active).then((data) =>
        //   dispatchFetchRateOfCjpyEth('uniswap(v3)', data)
        // );

        // Curve
        fetchCjpyPriceFromCurve(curvePoolContract).then((data) =>
          dispatchFetchRateOfCjpyEth('Curve', data)
        );
      }
    },
    60000,
    true
  );

  return null;
}
