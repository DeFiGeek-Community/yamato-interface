import { Box, Grid, GridItem } from '@chakra-ui/react';
import { useMarketState } from '../../state/market/hooks';
import { useYamatoStateForInfographics } from '../../state/yamato-entirety/hooks';
import { CategoryTitle } from '../CommonItem';
import CjpyPrice from './CjpyPrice';
import EthPrice from './EthPrice';
import Pool from './Pool';
import Tcr from './Tcr';
import {
  getChargeRankOfRedemption,
  getChargeRankOfSweep,
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
  rateOfCjpyJpy: {
    [source: string]: number;
  };
  tcr: number;
  rateOfEthJpy: number;
  ethChangePercent: number;
  redemptionReserve: number;
  isIncreaseForRedemptionReserve: boolean;
  sweepReserve: number;
  isIncreaseForSweepReserve: boolean;
}

export default function Infographics(props: Partial<InfographicsProps>) {
  const mstat = useMarketState();
  const ysfi = useYamatoStateForInfographics();
  const vals = { ...mstat, ...ysfi, ...props };

  const {
    rateOfCjpyJpy,
    tcr,
    rateOfEthJpy,
    ethChangePercent,
    redemptionReserve,
    isIncreaseForRedemptionReserve,
    sweepReserve,
    isIncreaseForSweepReserve,
  } = vals;

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
  const colorCodePerTcr = getColorCodePerTcr(tcr);
  /**
   * Rank up per 5000,000
   */
  const chargeRankOfRedemption = getChargeRankOfRedemption(redemptionReserve);
  /**
   * Rank up per 1000,000
   */
  const chargeRankOfSweep = getChargeRankOfSweep(sweepReserve);

  function renderSignalMessages() {
    const messages = getSignalMessages(cjpyPriceRank, ethPriceRank);
    return messages.map((message, index) => <p key={index}>{message}</p>);
  }

  return (
    <>
      <Box border="1px" borderColor="gray.200" borderRadius="md" p={4}>
        <CategoryTitle>CJPY Now</CategoryTitle>
      </Box>
      <Box border="1px" borderColor="gray.200" borderRadius="md" p={4}>
        <div style={{ minHeight: '16px', marginBottom: '10px' }}>
          {renderSignalMessages()}
        </div>
        <Grid
          templateRows="repeat(5, 1fr)"
          templateColumns="repeat(2, 1fr)"
          gap={4}
        >
          <GridItem colSpan={1} rowSpan={5}>
            <CjpyPrice
              cjpyPriceRank={cjpyPriceRank}
              ethPriceRank={ethPriceRank}
              colorCodePerTcr={colorCodePerTcr}
            />
          </GridItem>
          <GridItem colSpan={1} rowSpan={1}>
            <EthPrice ethPrice={rateOfEthJpy} ethPriceRank={ethPriceRank} />
          </GridItem>
          <GridItem colSpan={1} rowSpan={2}>
            <Tcr tcr={tcr} />
          </GridItem>
          <GridItem colSpan={1} rowSpan={2}>
            <Pool
              chargeRankOfRedemption={chargeRankOfRedemption}
              isIncreaseForRedemptionReserve={isIncreaseForRedemptionReserve}
              chargeRankOfSweep={chargeRankOfSweep}
              isIncreaseForSweepReserve={isIncreaseForSweepReserve}
            />
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}
