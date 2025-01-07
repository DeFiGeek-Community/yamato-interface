import { YAMATO_MAIN_ADDRESSES } from "@/constants/addresses";
import { useAppData } from "@/contexts/AppDataContext";
import { useReadContract } from "wagmi";
import yamatoABI from "@/constants/abis/yamato/Yamato.json";
import { useEffect, useState } from "react";
import { formatUnits } from "viem";

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
  const [data, setData] = useState<YamatoStatistics>({
    tvl: "",
    tcr: "",
    cjpyTotalSupply: "",
    marketPriceDiff: [],
  });
  const { chainId, ethPrice } = useAppData();

  const { data: yamatoData, refetch: yamatoRefetch } = useReadContract({
    address: YAMATO_MAIN_ADDRESSES[chainId],
    abi: yamatoABI,
    functionName: "getStates",
  }) as { data: bigint[]; refetch: any };

  useEffect(() => {
    if (yamatoData && ethPrice) {
      const tcr = formatUnits(
        ((yamatoData[0] * ethPrice) / yamatoData[1]) * BigInt(100),
        18
      );
      setData({
        tvl: formatUnits(yamatoData[0] * ethPrice, 18 * 2),
        tcr: tcr.toString(),
        cjpyTotalSupply: formatUnits(yamatoData[1], 18),
        marketPriceDiff: [{ poolname: "Curve", value: 0.01 }],
      });
    }
  }, [yamatoData, ethPrice]);

  return {
    data,
  };
};
