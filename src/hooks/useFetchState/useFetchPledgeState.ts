import { formatEther } from '../../utils/web3';
import { useYamatoMainContract } from '../useContract';
import { useActiveWeb3React } from '../web3';

export async function useFetchPledgeState(): Promise<{
  account: string;
  collateral: number;
  debt: number;
  withdrawalLockDate: number;
}> {
  // TODO: subgraph pattern
  return useFetchPledgeStateFromContract();
}

async function useFetchPledgeStateFromContract() {
  const { account } = useActiveWeb3React();
  const yamatoMainContract = useYamatoMainContract();

  if (!account || !yamatoMainContract) {
    return {
      account: '',
      collateral: 0,
      debt: 0,
      withdrawalLockDate: 0,
    };
  }

  const pledge = await yamatoMainContract.pledges(account);
  const withdrawalLockDate = await yamatoMainContract.withdrawLocks(account);

  return {
    account,
    collateral: Number(formatEther(pledge.coll)),
    debt: pledge.debt.toNumber(),
    withdrawalLockDate: withdrawalLockDate.toNumber(),
  };
}
