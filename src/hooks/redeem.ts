import { useState, useEffect } from "react";
import {
  YAMATO_MAIN_ADDRESSES,
} from "@/constants/addresses";
import { useAppData } from "@/contexts/AppDataContext";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import YAMATO_ABI from "@/constants/abis/yamato/YamatoV3.json";
import { parseEther } from "viem";
import { toaster } from "@/components/ui/toaster";

export const useRedeem = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hash, setHash] = useState<`0x${string}` | undefined>();
  const { chainId } = useAppData();
  const { writeContractAsync } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleRedeem = async (amount: string, isCoreRedemption: boolean = false) => {
    if (!amount) return;
    
    setIsLoading(true);
    try {
      const txHash = await writeContractAsync({
        address: YAMATO_MAIN_ADDRESSES[chainId],
        abi: YAMATO_ABI,
        functionName: "redeem",
        args: [parseEther(amount), isCoreRedemption],
      });
      
      setHash(txHash);
      
      toaster.create({
        title: "Transaction submitted",
        description: "Your redemption transaction has been submitted.",
        duration: 5000,
        type: "info",
      });
    } catch (error) {
      console.error("Redeem error:", error);
      toaster.create({
        title: "Redeem error",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        duration: 5000,
        type: "error",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isConfirming) {
      toaster.create({
        title: "Transaction confirming",
        description: "Your redemption transaction is being confirmed.",
        duration: 3000,
        type: "info",
      });
    }
    
    if (isSuccess) {
      toaster.create({
        title: "Redeem successful",
        description: "You have successfully redeemed ETH for CJPY.",
        duration: 5000,
        type: "success",
      });
      setIsLoading(false);
      setHash(undefined);
    }
  }, [isConfirming, isSuccess]);

  return {
    redeem: handleRedeem,
    isLoading: isLoading || isConfirming,
    isSuccess,
  };
};