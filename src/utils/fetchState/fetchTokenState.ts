import { CJPY, YMT, VeYMT } from '../../infrastructures/abis/types';
import { formatCjpy } from '../web3';

export async function fetchTotalSupply(contracts: {
  cjpyContract: CJPY | null;
  ymtContract: YMT | null;
  veYmtContract: VeYMT | null;
}): Promise<{
  cjpy: { totalSupply: number };
  ymt: { totalSupply: number };
  veYmt: { totalSupply: number; boostRate: number };
}> {
  return {
    cjpy: {
      totalSupply: contracts.cjpyContract
        ? Number(formatCjpy(await contracts.cjpyContract.totalSupply()))
        : 0,
    },
    // ymt: {
    //   totalSupply: contracts.ymtContract
    //     ? Number(formatCjpy(await contracts.ymtContract.totalSupply()))
    //     : 0,
    // },
    ymt: {
      totalSupply: 0,
    },
    // veYmt: {
    //   totalSupply: contracts.veYmtContract
    //     ? Number(formatCjpy((await contracts.veYmtContract.totalSupply()))
    //     : 0,
    //   boostRate: 0,
    // },
    veYmt: {
      totalSupply: 0,
      boostRate: 0,
    },
  };
}

export async function fetchTokenBalance(
  account: string,
  contracts: {
    cjpyContract: CJPY | null;
    ymtContract: YMT | null;
    veYmtContract: VeYMT | null;
  }
): Promise<{
  cjpy: { totalSupply: number };
  ymt: { totalSupply: number };
  veYmt: { totalSupply: number; boostRate: number };
}> {
  return {
    cjpy: {
      totalSupply: contracts.cjpyContract
        ? Number(formatCjpy(await contracts.cjpyContract.balanceOf(account)))
        : 0,
    },
    // ymt: {
    //   totalSupply: contracts.ymtContract
    //     ? Number(formatCjpy(await contracts.ymtContract.balanceOf(account)))
    //     : 0,
    // },
    ymt: {
      totalSupply: 0,
    },
    // veYmt: {
    //   totalSupply: contracts.veYmtContract
    //     ? Number(formatCjpy(await contracts.veYmtContract.balanceOf(account)))
    //     : 0,
    //   boostRate: 0,
    // },
    veYmt: {
      totalSupply: 0,
      boostRate: 0,
    },
  };
}
