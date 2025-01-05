import React, { useState, ReactNode, useEffect } from "react";
import { useAccount } from "wagmi";
import { AppDataContext, AppDataContextType } from "@/contexts/AppDataContext";
import { SupportedChainId } from "@/constants/chains";

export const AppDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { chain } = useAccount();
  const [chainId, setChainId] = useState<number>(SupportedChainId.MAINNET);

  useEffect(() => {
    if (chain) {
      setChainId(chain.id);
    }
  }, [chain]);

  const value: AppDataContextType = {
    chainId,
  };

  return (
    <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
  );
};
