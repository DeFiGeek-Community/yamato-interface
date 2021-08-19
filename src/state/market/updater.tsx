import useInterval from '../../hooks/useInterval';
import { useFetchRateOfCjpyJpy } from './hooks';

export default function Updater(): null {
  const fetchRateOfCjpyJpy = useFetchRateOfCjpyJpy();

  useInterval(() => {
    // TODO: replace me.
    const mockState = 0.7 + Math.random();
    fetchRateOfCjpyJpy('uniswap', mockState);
  }, 5000);

  return null;
}
