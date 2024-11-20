import { useCurrency } from '../../context/CurrencyContext';
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
  const { currency } = useCurrency();

  const dispatchFetchRateOfCjpyEth = useFetchRateOfCjpyEth();

  useInterval(
    () => {
      if (isUseMock) {
        dispatchFetchRateOfCjpyEth('uniswap(v3)', rateOfEthJpy);
        dispatchFetchRateOfCjpyEth('uniswap(v2)', rateOfEthJpy);
      } else {
        fetchCjpyPriceFromUniswap('v3', chainId, active, currency).then((data) =>
          dispatchFetchRateOfCjpyEth('uniswap(v3)', data)
        );
      }
    },
    60000,
    true
  );

  return null;
}
