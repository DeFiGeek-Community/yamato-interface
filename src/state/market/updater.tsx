import useInterval from '../../hooks/useInterval';
import { useFetchRateOfCjpyJpy } from './hooks';

export default function Updater(): null {
  const fetchRateOfCjpyJpy = useFetchRateOfCjpyJpy();

  useInterval(() => {
    // TODO: replace me.
    fetchRateOfCjpyJpy('uniswap', 0.7 + Math.random());
    fetchRateOfCjpyJpy('balancer', 0.7 + Math.random());
  }, 5000);

  return null;
}
