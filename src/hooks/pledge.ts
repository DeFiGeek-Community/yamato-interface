import { YAMATO_MAIN_ADDRESSES } from "@/constants/addresses";
import { useAppData } from "@/contexts/AppDataContext";
import { useAccount, useReadContract } from "wagmi";
import { useBaseTransaction } from "@/hooks/transaction";
import YAMATO_ABI from "@/constants/abis/yamato/YamatoV3.json";
import { formatUnits, parseEther } from "viem";

type Pledge = {
  collateral: string;
  debt: string;
  valuation: string;
  collateralRate: string;
  maxBorrowable: string;
};

export const usePledge = () => {
  const pledge: Pledge = {
    collateral: "0",
    debt: "0",
    valuation: "0",
    collateralRate: "0",
    maxBorrowable: "0",
  };

  const { chainId, ethPrice } = useAppData();
  const { address } = useAccount();

  const { data: pledgeData } = useReadContract({
    address: YAMATO_MAIN_ADDRESSES[chainId],
    abi: YAMATO_ABI,
    functionName: "getIndividualStates",
    args: [address],
  }) as { data: bigint[] };

  if (pledgeData && ethPrice) {
    const MCR = BigInt(130);
    const collateral = pledgeData[0];
    const debt = pledgeData[1];
    const valuation = pledgeData[0] * ethPrice;
    pledge.collateral = formatUnits(collateral, 18);
    pledge.debt = formatUnits(debt, 18);
    pledge.valuation = formatUnits(valuation, 18 * 2);
    if (debt !== BigInt(0)) {
      pledge.collateralRate = formatUnits((valuation * BigInt(100)) / debt, 18);
    }
    pledge.maxBorrowable = formatUnits(
      ((valuation / BigInt(Math.pow(10, 18))) * BigInt(100)) / MCR - debt,
      18
    );
  }

  return { pledge };
};

export const useDeposit = () => {
  const { executeTransaction, isLoading, isSuccess } = useBaseTransaction();

  const handleDeposit = async (amount: string) => {
    await executeTransaction(
      "deposit", 
      undefined,
      parseEther(amount),
    );
  };

  return {
    deposit: handleDeposit,
    isLoading,
    isSuccess,
  };
};

export const useWithdraw = () => {
  const { executeTransaction, isLoading, isSuccess } = useBaseTransaction();

  const handleWithdraw = async (amount: string) => {    
    await executeTransaction(
      "withdraw", 
      [parseEther(amount)]
    );
  };

  return {
    withdraw: handleWithdraw,
    isLoading,
    isSuccess,
  };
};

export const useBorrow = () => {
  const { executeTransaction, isLoading, isSuccess } = useBaseTransaction();

  const handleBorrow = async (amount: string) => {
    await executeTransaction(
      "borrow", 
      [parseEther(amount)]
    );
  };

  return {
    borrow: handleBorrow,
    isLoading,
    isSuccess,
  };
};

export const useRepay = () => {
  const { executeTransaction, isLoading, isSuccess } = useBaseTransaction();

  const handleRepay = async (amount: string) => {    
    await executeTransaction(
      "repay", 
      [parseEther(amount)]
    );
  };

  return {
    repay: handleRepay,
    isLoading,
    isSuccess,
  };
};