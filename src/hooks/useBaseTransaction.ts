import { useState, useEffect } from "react";
import { YAMATO_MAIN_ADDRESSES } from "@/constants/addresses";
import { useAppData } from "@/contexts/AppDataContext";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import YAMATO_ABI from "@/constants/abis/yamato/YamatoV3.json";
import { toaster } from "@/components/ui/toaster";

export function useBaseTransaction() {
  const [isLoading, setIsLoading] = useState(false);
  const [hash, setHash] = useState<`0x${string}` | undefined>();
  const { chainId } = useAppData();
  const { writeContractAsync } = useWriteContract();
  const { isLoading: isConfirming, isSuccess, isError } = useWaitForTransactionReceipt({
    hash,
  });
  const addRecentTransaction = useAddRecentTransaction();

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

      await writeContractAsync(contractCallParams, {
        onSuccess: (tx) => {
          console.log(`${functionName} success:`, tx);
          setHash(tx);
          addRecentTransaction({
            hash: tx,
            description: `${functionName} transaction`,
          })
          toaster.create({
            title: "トランザクション送信",
            description: "トランザクションが送信されました",
            duration: 5000,
            type: "info",
          });
        },
        onError: (error) => {
          console.error(`${functionName} error:`, error);
          toaster.create({
            title: "トランザクションエラー",
            description: "トランザクションに失敗しました",
            duration: 5000,
            type: "error",
          });
          setIsLoading(false);
          setHash(undefined);
        },
      });
    } catch (error) {
      console.error(`${functionName} error:`, error);
    }
  };

  // Handle transaction confirmation
  useEffect(() => {
    if (hash && isSuccess) {
      toaster.create({
        title: "トランザクション完了",
        description: "トランザクションが完了しました",
        duration: 5000,
        type: "success"
      });
      setIsLoading(false);
      setHash(undefined);
    }
  }, [isSuccess, hash]);

  // Handle transaction error
  useEffect(() => {
    if (isError) {
      toaster.create({
        title: "トランザクションエラー",
        description: "トランザクションに失敗しました",
        duration: 5000,
        type: "error",
      });
      setIsLoading(false);
      setHash(undefined);
    }
  }, [isError]);

  return {
    executeTransaction,
    isLoading: isLoading || isConfirming,
    isSuccess,
    isError,
  };
}