import { YAMATO_MAIN_ADDRESSES } from "@/constants/addresses";
import { useAppData } from "@/contexts/AppDataContext";
import { useReadContract } from "wagmi";
import yamatoABI from "@/constants/abis/yamato/Yamato.json";
import { formatUnits } from "viem";
import { roundDecimal } from "@/utils";

type MarketPriceDiff = {
  poolname: string;
  value: number;
};

type YamatoStatistics = {
  tvl: string;
  tcr: string;
  cjpyTotalSupply: string;
  marketPriceDiff: MarketPriceDiff[];
};

export const useYamatoStatistics = () => {
  const data: YamatoStatistics = {
    tvl: "",
    tcr: "",
    cjpyTotalSupply: "",
    marketPriceDiff: [],
  };

  const { chainId, ethPrice } = useAppData();

  const { data: yamatoData } = useReadContract({
    address: YAMATO_MAIN_ADDRESSES[chainId],
    abi: yamatoABI,
    functionName: "getStates",
  }) as { data: bigint[]; refetch: any };

  if (yamatoData && ethPrice) {
    const tcr = roundDecimal(
      formatUnits(
        ((yamatoData[0] * ethPrice) / yamatoData[1]) * BigInt(100),
        18
      )
    );

    data.tvl = roundDecimal(formatUnits(yamatoData[0] * ethPrice, 18 * 2));
    data.tcr = tcr;
    data.cjpyTotalSupply = roundDecimal(formatUnits(yamatoData[1], 18));
    data.marketPriceDiff = [{ poolname: "Curve", value: 0.01 }];
  }

  return {
    data,
  };
};
