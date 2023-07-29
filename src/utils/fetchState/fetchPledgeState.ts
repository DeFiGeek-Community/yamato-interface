import { YamatoV3 } from '../../infrastructures/abis/types';
import { formatCjpy, formatEther } from '../web3';

export async function fetchPledgeStateFromContract(
  account: string | null | undefined,
  contracts: { yamatoMainContract: YamatoV3 | null }
) {
  if (!account || !contracts.yamatoMainContract) {
    return {
      '': {
        collateral: 0,
        debt: 0,
      },
    };
  }

  const indivisualStates =
    await contracts.yamatoMainContract.getIndividualStates(account); // coll, debt, isCreated, withdrawLock, depositAndBorrowLock

  return {
    [account.toLowerCase()]: {
      collateral: Number(formatEther(indivisualStates[0])),
      debt: Number(formatCjpy(indivisualStates[1])),
    },
  };
}
