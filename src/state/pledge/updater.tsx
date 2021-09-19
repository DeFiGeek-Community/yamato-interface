import { useEffect } from 'react';
import { useActiveWeb3React } from '../../hooks/web3';
import { useFetchMyPledge } from './hooks';

export default function Updater(): null {
  const { account } = useActiveWeb3React();

  const fetchMyPledge = useFetchMyPledge();

  // FIXME: Detect not only the account change but also the network change.
  useEffect(() => {
    // TODO: replace me.
    const mockState = {
      collateral: 3.5,
      debt: 800000,
      withdrawalLockDate: Date.now() / 1000 + 1000,
    };
    fetchMyPledge(
      account ?? '',
      mockState.collateral,
      mockState.debt,
      mockState.withdrawalLockDate
    );
  }, [account, fetchMyPledge]);

  return null;
}
