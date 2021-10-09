import { useYamatoMainContract } from '../../hooks/useContract';
import useInterval from '../../hooks/useInterval';
import { useActiveWeb3React } from '../../hooks/web3';
import { fetchPledgeStateFromContract } from '../../utils/fetchState';
import { useFetchMyPledge } from './hooks';

const isUseMock = !!process.env.REACT_APP_USE_MOCK;

export default function Updater(): null {
  const { active, account } = useActiveWeb3React();
  const yamatoMainContract = useYamatoMainContract();

  const fetchMyPledge = useFetchMyPledge();

  // FIXME: Detect not only the account change but also the network change.
  useInterval(async () => {
    if (!active || !account) {
      return;
    }

    let params;
    if (isUseMock) {
      params = {
        account: account ?? '',
        collateral: 3.5,
        debt: 800000,
        withdrawalLockDate: Date.now() / 1000 + 1000,
      };
    } else {
      params = await fetchPledgeStateFromContract(account, {
        yamatoMainContract,
      });
    }

    fetchMyPledge(
      params.account,
      params.collateral,
      params.debt,
      params.withdrawalLockDate
    );
  }, 5000);

  return null;
}
