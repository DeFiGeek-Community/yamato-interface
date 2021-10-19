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
  const { chainId } = useActiveWeb3React();

  const fetchRateOfCjpyEth = useFetchRateOfCjpyEth();

  useInterval(() => {
    // TODO: replace me.
    if (!isUseMock) {
      if (!chainId) {
        return;
      }

      fetchCjpyPriceFromUniswap('v3', chainId).then((data) =>
        fetchRateOfCjpyEth('uniswap(v3)', data)
      );
      fetchCjpyPriceFromUniswap('v2', chainId).then((data) => {
        fetchRateOfCjpyEth('uniswap(v2)', data);
      });
    } else {
      fetchRateOfCjpyEth('uniswap(v3)', rateOfEthJpy);
      fetchRateOfCjpyEth('uniswap(v2)', rateOfEthJpy);
    }
  }, 5000);

  return null;
}
