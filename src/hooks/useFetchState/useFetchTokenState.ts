import {
  useCjpyContract,
  useVeYmtContract,
  useYmtContract,
} from '../useContract';

export async function useFetchTotalSupply(): Promise<{
  cjpy: number;
  ymt: number;
  veYmt: number;
}> {
  const cjpyContract = useCjpyContract();
  const ymtContract = useYmtContract();
  const veYmtContract = useVeYmtContract();

  return {
    cjpy: cjpyContract ? (await cjpyContract.totalSupply()).toNumber() : 0,
    ymt: ymtContract ? (await ymtContract.totalSupply()).toNumber() : 0,
    veYmt: veYmtContract ? (await veYmtContract.totalSupply()).toNumber() : 0,
  };
}

export async function useFetchTokenBalance(account: string): Promise<{
  cjpy: number;
  ymt: number;
  veYmt: number;
}> {
  const cjpyContract = useCjpyContract();
  const ymtContract = useYmtContract();
  const veYmtContract = useVeYmtContract();

  return {
    cjpy: cjpyContract ? (await cjpyContract.balanceOf(account)).toNumber() : 0,
    ymt: ymtContract ? (await ymtContract.balanceOf(account)).toNumber() : 0,
    veYmt: veYmtContract
      ? (await veYmtContract.balanceOf(account)).toNumber()
      : 0,
  };
}
