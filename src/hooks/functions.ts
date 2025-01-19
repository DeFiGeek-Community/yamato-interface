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
type Functions = {
  redemptionReserve: string;
  redemptionReserveEth: string;
  sweepReserve: string;
  redeemableCandidate: string;
  redeemableCandidateEth: string;
  sweepableCandidate: string;
  redemptionReward: string;
  sweepReward: string;
};

export const useYamatoFunctions = () => {
  const data: Functions = {
    redemptionReserve: "0",
    redemptionReserveEth: "0",
    sweepReserve: "0",
    redeemableCandidate: "0",
    redeemableCandidateEth: "0",
    sweepableCandidate: "0",
    redemptionReward: "0",
    sweepReward: "0",
  };

  const { chainId, ethPrice } = useAppData();

  const priorityRegistryContract = {
    address: YAMATO_PRIORITY_REGISTRY_ADDRESSES[chainId],
    abi: YAMATO_PRIORITY_REGISTRY_ABI,
  };

  const { data: functionsData } = useReadContracts({
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

  if (functionsData && ethPrice) {
    const redemptionReserve = (functionsData[0].result as bigint[])[0];
    data.redemptionReserve = formatUnits(redemptionReserve, 18);
    data.redemptionReserveEth = formatUnits(
      (redemptionReserve * BigInt(10 ** 18)) / ethPrice,
      18
    );

    const sweepReserve = (functionsData[0].result as bigint[])[1];
    data.sweepReserve = formatUnits(sweepReserve, 18);

    const redeemableCandidate = functionsData[1].result as bigint;
    data.redeemableCandidate = formatUnits(redeemableCandidate, 18);
    data.redeemableCandidateEth = formatUnits(
      redeemableCandidate * ethPrice,
      18 * 2
    );

    const sweepableCandidate = functionsData[2].result as bigint;
    data.sweepableCandidate = formatUnits(sweepableCandidate, 18);

    const minRedemptionReward = minBigInt(
      redemptionReserve,
      redeemableCandidate
    );
    data.redemptionReward = formatUnits(
      (minRedemptionReward * BigInt(10 ** 18)) / ethPrice,
      18
    );

    const minSweepReward = minBigInt(sweepReserve, sweepableCandidate);
    data.sweepReward = formatUnits(minSweepReward / BigInt(100), 18);
  }

  return { data };
};
