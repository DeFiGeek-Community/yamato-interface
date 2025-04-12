import { useState, useEffect } from "react";
import { YAMATO_MAIN_ADDRESSES } from "@/constants/addresses";
import { useAppData } from "@/contexts/AppDataContext";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import YAMATO_ABI from "@/constants/abis/yamato/YamatoV3.json";
import { toaster } from "@/components/ui/toaster";

export function useBaseTransaction() {
  const [isLoading, setIsLoading] = useState(false);
  const [hash, setHash] = useState<`0x${string}` | undefined>();
  const { chainId } = useAppData();
  const { writeContractAsync } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const executeTransaction = async (
    functionName: string,
    args?: any[],
    value?: bigint,
  ) => {
    setIsLoading(true);
    try {
      const contractCallParams: any = {
        address: YAMATO_MAIN_ADDRESSES[chainId],
        abi: YAMATO_ABI,
        functionName,
      };

      // Add arguments if provided
      if (args && args.length > 0) {
        contractCallParams.args = args;
      }

      // Add value if provided
      if (value) {
        contractCallParams.value = value;
      }

      const txHash = await writeContractAsync(contractCallParams);
      
      setHash(txHash);
      
      toaster.create({
        title: "トランザクション送信",
        description: "トランザクションを送信しました",
        duration: 5000,
        type: "info",
      });
    } catch (error) {
      console.error(`${functionName} error:`, error);
      toaster.create({
        title: "トランザクションエラー",
        description: "トランザクションに失敗しました",
        duration: 5000,
        type: "error",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (hash) {
      if (isConfirming) {
        toaster.create({
          title: "トランザクション確認中",
          description: "トランザクションを確認中です",
          duration: 3000,
          type: "info",
        });
      }
      
      if (isSuccess) {
        toaster.create({
          title: "トランザクション完了",
          description: "トランザクションが完了しました",
          duration: 5000,
          type: "success"
        });
        setIsLoading(false);
        setHash(undefined);
      }
    }
  }, [isConfirming, isSuccess, hash]);

  return {
    executeTransaction,
    isLoading: isLoading || isConfirming,
    isSuccess,
  };
}