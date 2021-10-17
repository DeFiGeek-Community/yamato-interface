import { useYamatoMainContract } from '../../hooks/useContract';
import useInterval from '../../hooks/useInterval';
import { useActiveWeb3React } from '../../hooks/web3';
import { fetchPledgeStateFromContract } from '../../utils/fetchState';
import { mockPledge } from '../mockData';
import { useFetchMyPledge } from './hooks';

const isUseMock = process.env.REACT_APP_USE_MOCK
  ? JSON.parse(process.env.REACT_APP_USE_MOCK)
  : false;

const initialPledgeParams = {
  account: '',
  collateral: 0,
  debt: 0,
  withdrawalLockDate: 0,
};

export default function Updater(): null {
  const { active, account } = useActiveWeb3React();
  const yamatoMainContract = useYamatoMainContract();

  const fetchMyPledge = useFetchMyPledge();

  // FIXME: Detect not only the account change but also the network change.
  useInterval(async () => {
    if (!active || !account) {
      fetchMyPledge(
        initialPledgeParams.account,
        initialPledgeParams.collateral,
        initialPledgeParams.debt,
        initialPledgeParams.withdrawalLockDate
      );
      return;
    }

    let params;
    if (!isUseMock) {
      try {
        params = await fetchPledgeStateFromContract(account, {
          yamatoMainContract,
        });
      } catch (error) {
        console.error(error);
        params = { ...initialPledgeParams, account };
      }
    } else {
      params = mockPledge(account);
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
