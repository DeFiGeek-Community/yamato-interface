import { Box, Grid, GridItem, Heading, HStack, Text } from "@chakra-ui/react";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import CjpyPrice from "./CjpyPrice";
import EthPrice from "./EthPrice";
import Pool from "./Pool";
import Tcr from "./Tcr";
import {
  getReserveRankOfRedemption,
  getReserveRankOfSweep,
  getCjpyPriceRank,
  getColorCodePerTcr,
  getEthPriceRank,
  getSignalMessages,
} from "./functions";
import { Tooltip } from "../ui/tooltip";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { MarketPriceDiff, useYamatoStatistics } from "@/hooks/statistics";
import { useAppData } from "@/contexts/AppDataContext";
import { useYamatoFunctions } from "@/hooks/useYamatoFunctions";
import { formatUnits } from "viem";

function getChangePercent(current: number, previous: number): number {
  if (current === 0 || previous === 0) {
    return 0;
  }

  return ((current - previous) / previous) * 100;
}

function getCjpyRank(rateOfCjpyJpy: number) {
  if (!rateOfCjpyJpy) {
    return 0;
  }
  return getCjpyPriceRank(rateOfCjpyJpy);
}

function createRateOfCjpyJpy(data: MarketPriceDiff[]): number {
  if (data.length === 0) return 0; // Avoid division by zero

  const total = data.reduce((sum, item) => sum + parseFloat(item.value), 0);

  return total / data.length;
}

export interface InfographicsProps {
  // state.market
  rateOfCjpyJpy: [string, number][];

  // state.yamatoEntirety
  totalCollateral: number; // state.yamatoEntirety.lending.totalCollateral
  totalDebt: number; // state.yamatoEntirety.lending.totalDebt
  tcr: number; // state.yamatoEntirety.lending.tcr
  rateOfEthJpy: number; // state.yamatoEntirety.rateOfEthJpy
  prevRateOfEthJpy: number; // state.yamatoEntirety.prevRateOfEthJpy
  redemptionReserve: number; // state.yamatoEntirety.pool.redemptionReserve
  prevRedemptionReserve: number; // state.yamatoEntirety.pool.prevRedemptionReserve
  sweepReserve: number; // state.yamatoEntirety.pool.sweepReserve
  prevSweepReserve: number; // state.yamatoEntirety.pool.prevSweepReserve
}

export function InfographicsHelp() {
  const { t } = useTranslation();
  return (
    <Tooltip content={t("infographics.tcr")}>
      <RxQuestionMarkCircled />
    </Tooltip>
    // <ItemTitleValue>{t('infographics.tcr')}</ItemTitleValue>
    // <ItemTitleValue>{t('infographics.mcr')}</ItemTitleValue>
  );
}

export function InfographicsContent(props: Partial<InfographicsProps>) {
  const { data: statisticsData } = useYamatoStatistics();
  const { functionsData } = useYamatoFunctions();
  const { prevEthPrice, ethPrice } = useAppData();

  const prevRateOfEthJpy = Number(formatUnits(prevEthPrice, 18));
  const rateOfEthJpy = Number(formatUnits(ethPrice, 18));
  const rateOfCjpyJpy = createRateOfCjpyJpy(statisticsData.marketPriceDiff);
  const { t } = useTranslation();

  const MCR = 130;

  const {
    redemptionReserve,
    prevRedemptionReserve,
    sweepReserve,
    prevSweepReserve,
    tcr,
  } = Object.fromEntries(
    Object.entries({ ...statisticsData, ...functionsData }).map(
      ([key, value]) => [key, Number(value)]
    )
  );

  const ethChangePercent = useMemo(
    () => getChangePercent(rateOfEthJpy, prevRateOfEthJpy),
    [rateOfEthJpy, prevRateOfEthJpy]
  );
  const isDecreaseForRedemptionReserve = useMemo(
    () => redemptionReserve < prevRedemptionReserve,
    [redemptionReserve, prevRedemptionReserve]
  );
  const isDecreaseForSweepReserve = useMemo(
    () => sweepReserve < prevSweepReserve,
    [sweepReserve, prevSweepReserve]
  );
  const isRedeemablePledge = useMemo(
    () => functionsData.redeemableCandidate !== "0",
    [functionsData]
  );

  /**
   * All 21 Ranks(-10 ~ +10)
   */
  const cjpyPriceRank = useMemo(
    () => getCjpyRank(rateOfCjpyJpy),
    [rateOfCjpyJpy]
  );
  /**
   * All 91 Ranks(-45 ~ +45)
   */
  const ethPriceRank = useMemo(
    () => getEthPriceRank(ethChangePercent),
    [ethChangePercent]
  );
  /**
   * All 125 ranks. Min 236 - Mid 298 - Max 360
   */
  const colorCodePerTcr = useMemo(
    () => getColorCodePerTcr(tcr, MCR),
    [tcr, MCR]
  );
  /**
   * Rank up per 5000,000
   */
  const reserveRankOfRedemption = useMemo(
    () => getReserveRankOfRedemption(redemptionReserve),
    [redemptionReserve]
  );
  /**
   * Rank up per 1000,000
   */
  const reserveRankOfSweep = useMemo(
    () => getReserveRankOfSweep(sweepReserve),
    [sweepReserve]
  );

  const renderSignalMessages = useCallback(() => {
    const messages = getSignalMessages(
      cjpyPriceRank,
      ethPriceRank,
      isRedeemablePledge,
      t
    );
    return messages.map((message, index) => (
      <Text key={index} style={{ display: "block" }}>
        {message}
      </Text>
    ));
  }, [cjpyPriceRank, ethPriceRank, isRedeemablePledge, t]);

  return (
    <>
      <Text mb={2}>{renderSignalMessages()}</Text>
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        <GridItem colSpan={1}>
          <CjpyPrice
            cjpyPriceRank={cjpyPriceRank}
            ethPriceRank={ethPriceRank}
            colorCodePerTcr={colorCodePerTcr}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <EthPrice ethPrice={rateOfEthJpy} ethPriceRank={ethPriceRank} />
          <div style={{ margin: "0.4rem 0" }}>
            <Tcr tcr={tcr} />
          </div>
          <Pool
            reserveRankOfRedemption={reserveRankOfRedemption}
            isDecreaseForRedemptionReserve={isDecreaseForRedemptionReserve}
            reserveRankOfSweep={reserveRankOfSweep}
            isDecreaseForSweepReserve={isDecreaseForSweepReserve}
          />
        </GridItem>
      </Grid>
    </>
  );
}

export default function Infographics(props: Partial<InfographicsProps>) {
  return (
    <Box p={2} m={2} bg="brand.white" borderRadius="md" shadow="lg">
      <Heading fontWeight="bold" bg="brand.green" mb={2}>
        <HStack>
          <Text fontSize="lg" fontWeight="bold" color="white">
            CJPY Now
          </Text>

          <InfographicsHelp />
        </HStack>
      </Heading>
      <InfographicsContent {...props} />
    </Box>
  );
}
