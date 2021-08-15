import useInterval from '../../hooks/useInterval';
import { useFetchingEthRate } from './hooks';

export default function Updater(): null {
  const fetchingEthRate = useFetchingEthRate();

  useInterval(() => {
    fetchingEthRate(300000 + Math.random() * 1000);
  }, 1000);

  return null;
}
