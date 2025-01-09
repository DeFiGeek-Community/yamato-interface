import { YAMATO_MAIN_ADDRESSES } from "@/constants/addresses";
import { useAppData } from "@/contexts/AppDataContext";
import { useAccount, useReadContract } from "wagmi";
import YAMATO_ABI from "@/constants/abis/yamato/YamatoV3.json";
import { formatUnits } from "viem";

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
