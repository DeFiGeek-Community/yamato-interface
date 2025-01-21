import React, { useState, ReactNode, useEffect } from "react";
import { useAccount, useReadContract } from "wagmi";
import { AppDataContext, AppDataContextType } from "@/contexts/AppDataContext";
import { SupportedChainId } from "@/constants/chains";
import { YAMATO_PRICE_FEED_ADDRESSES } from "@/constants/addresses";
import pricefeedABI from "@/constants/abis/yamato/PriceFeedV3.json";

export const AppDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { chain } = useAccount();
  const [chainId, setChainId] = useState<number>(SupportedChainId.MAINNET);
  const [ethPrice, setEthPrice] = useState<bigint>(BigInt(0));
  const [prevEthPrice, setPrevEthPrice] = useState<bigint>(BigInt(0));

  useEffect(() => {
    if (chain) {
      setChainId(chain.id);
    }
  }, [chain]);

  const { data: fetchedEthPrice, refetch: ethRefetch } = useReadContract({
    address: YAMATO_PRICE_FEED_ADDRESSES[chainId],
    abi: pricefeedABI,
    functionName: "getPrice",
  }) as { data: bigint; refetch: any };

  useEffect(() => {
    if (fetchedEthPrice) {
      if (fetchedEthPrice === BigInt(0)) {
        setPrevEthPrice(fetchedEthPrice);
      }
      setEthPrice(fetchedEthPrice);
    }
  }, [fetchedEthPrice]);

  useEffect(() => {
    const id = setInterval(() => {
      ethRefetch();
    }, 60000);

    return () => clearInterval(id);
  }, [chainId, ethRefetch]);

  const value: AppDataContextType = {
    chainId,
    prevEthPrice,
    ethPrice,
  };

  return (
    <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
  );
};
