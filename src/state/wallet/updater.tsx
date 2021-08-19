import useInterval from '../../hooks/useInterval';
import { useActiveWeb3React } from '../../hooks/web3';
import { formatEther } from '../../utils/web3';
import { useFetchWallet } from './hooks';

export default function Updater(): null {
  const { account, library } = useActiveWeb3React();
  const fetchWallet = useFetchWallet();

  useInterval(async () => {
    const eth =
      library && account
        ? Number(formatEther(await library.getBalance(account)))
        : 0;
    // TODO: replace me.
    const mockState = { cjpy: 1000 };
    fetchWallet(mockState.cjpy, eth);
  }, 5000);

  return null;
}
