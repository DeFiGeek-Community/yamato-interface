import { useState, useEffect } from "react";
import {
  YAMATO_MAIN_ADDRESSES,
} from "@/constants/addresses";
import { useAppData } from "@/contexts/AppDataContext";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import YAMATO_ABI from "@/constants/abis/yamato/YamatoV3.json";
import { toaster } from "@/components/ui/toaster";

export const useSweep = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hash, setHash] = useState<`0x${string}` | undefined>();
  const { chainId } = useAppData();
  const { writeContractAsync } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleSweep = async () => {
    setIsLoading(true);
    try {
      const txHash = await writeContractAsync({
        address: YAMATO_MAIN_ADDRESSES[chainId],
        abi: YAMATO_ABI,
        functionName: "sweep",
      });
      
      setHash(txHash);
      
      toaster.create({
        title: "Transaction submitted",
        description: "Your sweep transaction has been submitted.",
        duration: 5000,
        type: "info",
      });
    } catch (error) {
      console.error("Sweep error:", error);
      toaster.create({
        title: "Sweep error",
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
        description: "Your sweep transaction is being confirmed.",
        duration: 3000,
        type: "info",
      });
    }
    
    if (isSuccess) {
      toaster.create({
        title: "Sweep successful",
        description: "You have successfully performed a sweep operation.",
        duration: 5000,
        type: "success",
      });
      setIsLoading(false);
      setHash(undefined);
    }
  }, [isConfirming, isSuccess]);

  return {
    sweep: handleSweep,
    isLoading: isLoading || isConfirming,
    isSuccess,
  };
};