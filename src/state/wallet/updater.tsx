import {
  useCjpyContract,
  useYmtContract,
  useVeYmtContract,
} from '../../hooks/useContract';
import useInterval from '../../hooks/useInterval';
import { useActiveWeb3React } from '../../hooks/web3';
import { fetchTokenBalance } from '../../utils/fetchState';
import { getEthBalance } from '../../utils/web3';
import { mockWalletBalance } from '../mockData';
import { useFetchWallet } from './hooks';

const isUseMock = process.env.REACT_APP_USE_MOCK
  ? JSON.parse(process.env.REACT_APP_USE_MOCK)
  : false;

export default function Updater(): null {
  const { active, account, library } = useActiveWeb3React();

  const cjpyContract = useCjpyContract();
  const ymtContract = useYmtContract();
  const veYmtContract = useVeYmtContract();

  const fetchWallet = useFetchWallet();

  useInterval(async () => {
    if (!active || !account) {
      return;
    }

    let walletParams;
    if (!isUseMock) {
      const wallet = await fetchTokenBalance(account, {
        cjpyContract,
        ymtContract,
        veYmtContract,
      });
      walletParams = {
        eth: await getEthBalance(account, library),
        cjpy: wallet.cjpy.totalSupply,
      };
    } else {
      walletParams = mockWalletBalance;
    }
    fetchWallet(walletParams.cjpy, walletParams.eth);
  }, 5000);

  return null;
}
