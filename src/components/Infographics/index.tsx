import { Grid, GridItem } from '@chakra-ui/react';
import { useMarketState } from '../../state/market/hooks';
import { useYamatoStateForInfographics } from '../../state/yamato-entirety/hooks';
import { getEthChangePercent } from '../../utils/prices';
import {
  CategoryTitle,
  ConentBox,
  HeaderBox1,
  ItemTitleValue,
} from '../CommonItem';
import CjpyPrice from './CjpyPrice';
import EthPrice from './EthPrice';
import Pool from './Pool';
import Tcr from './Tcr';
import {
  getReserveRankOfRedemption,
  getReserveRankOfSweep,
  getCjpyPriceRank,
  getColorCodePerTcr,
  getEthPriceRank,
  getSignalMessages,
} from './functions';

function getCjpyRank(rateOfCjpyJpy: { [source: string]: number }) {
  const marketRate = rateOfCjpyJpy;
  const rawPrice = Object.values(marketRate)[0];
  if (rawPrice == null) {
    return 0;
  }
  return getCjpyPriceRank(rawPrice);
}

export interface InfographicsProps {
  // state.market
  rateOfCjpyJpy: {
    [source: string]: number;
  };

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

export function InfographicsContent(props: Partial<InfographicsProps>) {
  const marketState = useMarketState();
  const yamatoState = useYamatoStateForInfographics();
  const mixedValues = { ...marketState, ...yamatoState, ...props };

  const { rateOfCjpyJpy, rateOfEthJpy, redemptionReserve, sweepReserve, MCR } =
    mixedValues;

  const tcr =
    props.hasOwnProperty('totalCollateral') ||
    props.hasOwnProperty('totalDebt') ||
    props.hasOwnProperty('rateOfEthJpy') ||
    mixedValues.totalDebt
      ? (100 * mixedValues.totalCollateral * mixedValues.rateOfEthJpy) /
        mixedValues.totalDebt
      : mixedValues.tcr;
  const ethChangePercent = getEthChangePercent(
    mixedValues.rateOfEthJpy,
    mixedValues.prevRateOfEthJpy
  );
  const isIncreaseForRedemptionReserve =
    mixedValues.redemptionReserve > mixedValues.prevRedemptionReserve;
  const isIncreaseForSweepReserve =
    mixedValues.sweepReserve > mixedValues.prevSweepReserve;

  /**
   * All 21 Ranks(-10 ~ +10)
   */
  const cjpyPriceRank = getCjpyRank(rateOfCjpyJpy);
  /**
   * All 91 Ranks(-45 ~ +45)
   */
  const ethPriceRank = getEthPriceRank(ethChangePercent);
  /**
   * All 125 ranks. Min 236 - Mid 298 - Max 360
   */
  const colorCodePerTcr = getColorCodePerTcr(tcr, MCR);
  /**
   * Rank up per 5000,000
   */
  const reserveRankOfRedemption = getReserveRankOfRedemption(redemptionReserve);
  /**
   * Rank up per 1000,000
   */
  const reserveRankOfSweep = getReserveRankOfSweep(sweepReserve);

  function renderSignalMessages() {
    const messages = getSignalMessages(cjpyPriceRank, ethPriceRank);
    return messages.map((message, index) => (
      <ItemTitleValue key={index} style={{ display: 'block' }}>
        {message}
      </ItemTitleValue>
    ));
  }

  return (
    <>
      <div style={{ minHeight: '16px', marginBottom: '10px' }}>
        {renderSignalMessages()}
      </div>
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
          <div style={{ margin: '0.4rem 0' }}>
            <Tcr tcr={tcr} />
          </div>
          <Pool
            reserveRankOfRedemption={reserveRankOfRedemption}
            isIncreaseForRedemptionReserve={isIncreaseForRedemptionReserve}
            reserveRankOfSweep={reserveRankOfSweep}
            isIncreaseForSweepReserve={isIncreaseForSweepReserve}
          />
        </GridItem>
      </Grid>
    </>
  );
}

export default function Infographics(props: Partial<InfographicsProps>) {
  return (
    <>
      <HeaderBox1>
        <CategoryTitle>CJPY Now</CategoryTitle>
      </HeaderBox1>
      <ConentBox>
        <InfographicsContent {...props} />
      </ConentBox>
    </>
  );
}
