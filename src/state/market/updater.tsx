import useInterval from '../../hooks/useInterval';
import { useActiveWeb3React } from '../../hooks/web3';
import { fetchCjpyPriceFromUniswap } from '../../utils/fetchState/fetchCjpyPriceFromUniswap';
import { rateOfEthJpy } from '../mockData';
import { useFetchRateOfCjpyEth } from './hooks';

const isUseMock = process.env.REACT_APP_USE_MOCK
  ? JSON.parse(process.env.REACT_APP_USE_MOCK)
  : false;

// Data except Ethereum
export default function Updater(): null {
  const { active, chainId } = useActiveWeb3React();

  const dispatchFetchRateOfCjpyEth = useFetchRateOfCjpyEth();

  useInterval(
    () => {
      if (!isUseMock) {
        fetchCjpyPriceFromUniswap('v3', chainId, active).then((data) =>
          dispatchFetchRateOfCjpyEth('uniswap(v3)', data)
        );
        fetchCjpyPriceFromUniswap('v2', chainId, active).then((data) => {
          dispatchFetchRateOfCjpyEth('uniswap(v2)', data);
        });
      } else {
        dispatchFetchRateOfCjpyEth('uniswap(v3)', rateOfEthJpy);
        dispatchFetchRateOfCjpyEth('uniswap(v2)', rateOfEthJpy);
      }
    },
    5000,
    true
  );

  return null;
}
