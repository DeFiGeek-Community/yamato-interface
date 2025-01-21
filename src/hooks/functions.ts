import {
  YAMATO_POOL_ADDRESSES,
  YAMATO_PRIORITY_REGISTRY_ADDRESSES,
} from "@/constants/addresses";
import { useAppData } from "@/contexts/AppDataContext";
import { useReadContracts } from "wagmi";
import YAMATO_POOL_ABI from "@/constants/abis/yamato/PoolV2.json";
import YAMATO_PRIORITY_REGISTRY_ABI from "@/constants/abis/yamato/PriorityRegistryV6.json";
import { formatUnits } from "viem";
import { minBigInt } from "@/utils";
import { useRef, useState } from "react";
type FunctionsData = {
  prevRedemptionReserve: string;
  redemptionReserve: string;
  redemptionReserveEth: string;
  prevSweepReserve: string;
  sweepReserve: string;
  redeemableCandidate: string;
  redeemableCandidateEth: string;
  sweepableCandidate: string;
  redemptionReward: string;
  sweepReward: string;
};

export const useYamatoFunctions = () => {
  const functionsData: FunctionsData = {
    prevRedemptionReserve: "0",
    redemptionReserve: "0",
    redemptionReserveEth: "0",
    prevSweepReserve: "0",
    sweepReserve: "0",
    redeemableCandidate: "0",
    redeemableCandidateEth: "0",
    sweepableCandidate: "0",
    redemptionReward: "0",
    sweepReward: "0",
  };

  const initialValues = useRef<{
    prevRedemptionReserve: string | null;
    prevSweepReserve: string | null;
  }>({
    prevRedemptionReserve: null,
    prevSweepReserve: null,
  });

  const { chainId, ethPrice } = useAppData();

  const priorityRegistryContract = {
    address: YAMATO_PRIORITY_REGISTRY_ADDRESSES[chainId],
    abi: YAMATO_PRIORITY_REGISTRY_ABI,
  };

  const { data: fetchedData } = useReadContracts({
    contracts: [
      {
        address: YAMATO_POOL_ADDRESSES[chainId],
        abi: YAMATO_POOL_ABI,
        functionName: "getStates",
      },
      {
        ...priorityRegistryContract,
        functionName: "getRedeemablesCap",
      },
      {
        ...priorityRegistryContract,
        functionName: "getSweepablesCap",
      },
    ],
  });

  if (fetchedData && ethPrice) {
    const redemptionReserve = (fetchedData[0].result as bigint[])[0];
    functionsData.redemptionReserve = formatUnits(redemptionReserve, 18);
    functionsData.redemptionReserveEth = formatUnits(
      (redemptionReserve * BigInt(10 ** 18)) / ethPrice,
      18
    );

    const sweepReserve = (fetchedData[0].result as bigint[])[1];
    functionsData.sweepReserve = formatUnits(sweepReserve, 18);

    const redeemableCandidate = fetchedData[1].result as bigint;
    functionsData.redeemableCandidate = formatUnits(redeemableCandidate, 18);
    functionsData.redeemableCandidateEth = formatUnits(
      redeemableCandidate * ethPrice,
      18 * 2
    );

    const sweepableCandidate = fetchedData[2].result as bigint;
    functionsData.sweepableCandidate = formatUnits(sweepableCandidate, 18);

    const minRedemptionReward = minBigInt(
      redemptionReserve,
      redeemableCandidate
    );
    functionsData.redemptionReward = formatUnits(
      (minRedemptionReward * BigInt(10 ** 18)) / ethPrice,
      18
    );

    const minSweepReward = minBigInt(sweepReserve, sweepableCandidate);
    functionsData.sweepReward = formatUnits(minSweepReward / BigInt(100), 18);

    if (initialValues.current.prevRedemptionReserve === null) {
      initialValues.current.prevRedemptionReserve =
        functionsData.redemptionReserve;
    }
    if (initialValues.current.prevSweepReserve === null) {
      initialValues.current.prevSweepReserve = functionsData.sweepReserve;
    }

    functionsData.prevRedemptionReserve =
      initialValues.current.prevRedemptionReserve;
    functionsData.prevSweepReserve = initialValues.current.prevSweepReserve;
  }

  return { functionsData };
};
