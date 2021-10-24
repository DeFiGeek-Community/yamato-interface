import { Grid, GridItem, HStack } from '@chakra-ui/react';
import { useYamatoStateForInfographics } from '../../state/yamato-entirety/hooks';
import { getEthChangePercent } from '../../utils/prices';
import {
  CategoryTitle,
  ConentBox,
  HeaderBox1,
  ItemTitleValue,
} from '../CommonItem';
import TerminologyPopover from '../TerminologyPopover';
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

function getCjpyRank(rateOfCjpyJpy: [string, number]) {
  if (!rateOfCjpyJpy || !rateOfCjpyJpy[1]) {
    return 0;
  }

  const rawPrice = rateOfCjpyJpy[1];
  return getCjpyPriceRank(rawPrice);
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
  return (
    <TerminologyPopover>
      <div>
        <ItemTitleValue>TCR: 総担保比率(Total Collateral Ratio)</ItemTitleValue>
        <ItemTitleValue>
          MCR: 最低担保比率(Minimum Collateral Ratio)
        </ItemTitleValue>
      </div>
    </TerminologyPopover>
  );
}

export function InfographicsContent(props: Partial<InfographicsProps>) {
  const yamatoState = useYamatoStateForInfographics();
  const mixedValues = { ...yamatoState, ...props };

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
  const cjpyPriceRank = getCjpyRank(rateOfCjpyJpy[0]);
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
        <HStack>
          <CategoryTitle>CJPY Now</CategoryTitle>
          <InfographicsHelp />
        </HStack>
      </HeaderBox1>
      <ConentBox>
        <InfographicsContent {...props} />
      </ConentBox>
    </>
  );
}
