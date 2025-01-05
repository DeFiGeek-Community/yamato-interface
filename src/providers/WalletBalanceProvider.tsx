import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  useAccount,
  useBalance,
  useReadContract,
  useReadContracts,
} from "wagmi";
import { formatUnits } from "viem";
import { useAppData } from "@/contexts/AppDataContext";
import { WalletBalanceContext } from "@/contexts/WalletBalanceContext";
import { useReload } from "@/contexts/ReloadContext";
import { CJPY_ADDRESSES } from "@/constants/addresses";
import { erc20Abi } from "viem";

export const WalletBalanceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { chainId } = useAppData();
  const { address } = useAccount();

  const [cjpyBalance, setCjpyBalance] = useState<string | null>("0");
  const [ethBalance, setEthBalance] = useState<string | null>("0");

  const { reloadKey } = useReload();

  const { data: ethData, refetch: ethRefetch } = useBalance({
    address,
  });

  const cjpyContract = {
    address: CJPY_ADDRESSES[chainId],
    abi: erc20Abi,
  } as const;

  const { data: cjpyData, refetch: cjpyRefetch } = useReadContracts({
    contracts: address
      ? [
          {
            ...cjpyContract,
            functionName: "balanceOf",
            args: [address],
          },
          {
            ...cjpyContract,
            functionName: "decimals",
          },
        ]
      : [],
  });
  console.log(cjpyData, ethData);
  const reloadBalances = useCallback(() => {
    ethRefetch();
    cjpyRefetch();
  }, [ethRefetch, cjpyRefetch]);

  useEffect(() => {
    if (ethData) {
      setEthBalance(formatUnits(ethData.value, ethData.decimals));
    } else {
      setEthBalance("0");
    }
    if (cjpyData) {
      setCjpyBalance(
        formatUnits(
          (cjpyData?.[0]?.result as bigint) || BigInt(0),
          (cjpyData?.[1]?.result as number) || 18
        )
      );
    } else {
      setCjpyBalance("0");
    }
  }, [cjpyData, ethData, address, chainId, reloadKey]);

  return (
    <WalletBalanceContext.Provider
      value={{
        ethBalance: ethBalance,
        cjpyBalance: cjpyBalance,
        reloadBalances: reloadBalances,
      }}
    >
      {children}
    </WalletBalanceContext.Provider>
  );
};
