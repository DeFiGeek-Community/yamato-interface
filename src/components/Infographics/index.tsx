import { Box, Grid, GridItem } from '@chakra-ui/react';
import { useMarketState } from '../../state/market/hooks';
import { useYamatoStateForInfographics } from '../../state/yamato-entirety/hooks';
import { CategoryTitle } from '../CommonItem';
import CjpyPrice from './CjpyPrice';
import EthPrice from './EthPrice';
import Pool from './Pool';
import Tcr from './Tcr';
import {
  getCjpyPriceRank,
  getColorCodePerTcr,
  getEthPriceRank,
} from './functions';

function getCjpyRank(rateOfCjpyJpy: { [source: string]: number }) {
  const marketRate = rateOfCjpyJpy;
  const rawPrice = Object.values(marketRate)[0];
  if (rawPrice == null) {
    return 0;
  }
  return getCjpyPriceRank(rawPrice);
}

export default function Infographics() {
  const { rateOfCjpyJpy } = useMarketState();
  const {
    tcr,
    rateOfEthJpy,
    ethChangePercent,
    redemptionReserve,
    isIncreaseForRedemptionReserve,
    sweepReserve,
    isIncreaseForSweepReserve,
  } = useYamatoStateForInfographics();

  const cjpyPriceRank = getCjpyRank(rateOfCjpyJpy);
  const ethPriceRank = getEthPriceRank(ethChangePercent);
  const colorCodePerTcr = getColorCodePerTcr(tcr);

  return (
    <>
      <Box border="1px" borderColor="gray.200" borderRadius="md" p={4}>
        <CategoryTitle>CJPY Now</CategoryTitle>
      </Box>
      <Box border="1px" borderColor="gray.200" borderRadius="md" p={4}>
        <Grid
          templateRows="repeat(6, 1fr)"
          templateColumns="repeat(2, 1fr)"
          gap={4}
        >
          <GridItem colSpan={1} rowSpan={6}>
            <CjpyPrice
              cjpyPriceRank={cjpyPriceRank}
              ethPriceRank={ethPriceRank}
              colorCodePerTcr={colorCodePerTcr}
            />
          </GridItem>
          <GridItem colSpan={1} rowSpan={1}>
            <EthPrice ethPrice={rateOfEthJpy} ethPriceRank={ethPriceRank} />
          </GridItem>
          <GridItem colSpan={1} rowSpan={3}>
            <Tcr tcr={tcr} />
          </GridItem>
          <GridItem colSpan={1} rowSpan={2}>
            <Pool
              redemptionReserve={redemptionReserve}
              isIncreaseForRedemptionReserve={isIncreaseForRedemptionReserve}
              sweepReserve={sweepReserve}
              isIncreaseForSweepReserve={isIncreaseForSweepReserve}
            />
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}
