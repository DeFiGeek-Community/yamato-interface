import {
  CURVE_POOL_ADDRESS,
  YAMATO_MAIN_ADDRESSES,
} from "@/constants/addresses";
import { useAppData } from "@/contexts/AppDataContext";
import { useReadContract } from "wagmi";
import YAMATO_ABI from "@/constants/abis/yamato/Yamato.json";
import CURVE_POOL_ABI from "@/constants/abis/curve/curveTwocryptoOptimized.json";
import { formatUnits } from "viem";
import { CURVE_POOL_URLS } from "@/constants/api";

export type MarketPriceDiff = {
  poolname: string;
  marketLink: string;
  value: string;
  deviation: string;
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
    abi: YAMATO_ABI,
    functionName: "getStates",
  }) as { data: bigint[] };

  const { data: curveData } = useReadContract({
    address: CURVE_POOL_ADDRESS[chainId],
    abi: CURVE_POOL_ABI,
    functionName: "price_scale",
  }) as { data: bigint };

  if (ethPrice) {
    if (yamatoData) {
      const tcr = formatUnits(
        ((yamatoData[0] * ethPrice) / yamatoData[1]) * BigInt(100),
        18
      );

      data.tvl = formatUnits(yamatoData[0] * ethPrice, 18 * 2);
      data.tcr = tcr;
      data.cjpyTotalSupply = formatUnits(yamatoData[1], 18);
      data.marketPriceDiff = [];
    }

    if (curveData) {
      const price = ethPrice * curveData;
      data.marketPriceDiff.push({
        poolname: "Curve",
        marketLink: CURVE_POOL_URLS[chainId],
        value: formatUnits(price, 18 * 2),
        deviation: formatUnits(
          (price - BigInt(Math.pow(10, 36))) * BigInt(100),
          36
        ),
      });
    }
  }

  return {
    data,
  };
};
