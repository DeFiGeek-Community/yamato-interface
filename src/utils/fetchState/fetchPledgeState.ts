import { Yamato } from '../../infrastructures/abis/types';
import { formatCjpy, formatEther } from '../web3';

export async function useFetchPledgeState() {
  // TODO: subgraph pattern
  return fetchPledgeStateFromContract;
}

export async function fetchPledgeStateFromContract(
  account: string | null | undefined,
  contracts: { yamatoMainContract: Yamato | null }
) {
  if (!account || !contracts.yamatoMainContract) {
    return {
      account: account ?? '',
      collateral: 0,
      debt: 0,
      withdrawalLockDate: 0,
    };
  }

  const indivisualStates =
    await contracts.yamatoMainContract.getIndivisualStates(account); // coll, debt, isCreated, withdrawLock, depositAndBorrowLock

  return {
    account,
    collateral: Number(formatEther(indivisualStates[0])),
    debt: Number(formatCjpy(indivisualStates[1])),
    withdrawalLockDate: indivisualStates[3].toNumber(),
  };
}
