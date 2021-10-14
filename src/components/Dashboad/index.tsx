import { Grid, GridItem, VStack } from '@chakra-ui/react';
import { YAMATO_SYMBOL } from '../../constants/yamato';
import { useYamatoStateForDashboard } from '../../state/yamato-entirety/hooks';
import { formatPrice } from '../../utils/prices';
import { CategoryTitle, ConentBox, HeaderBox1 } from '../CommonItem';
import DashboadItem from './Item';

function getRateOfCjpyJpy(rateOfCjpyJpy: [string, number][]) {
  if (!rateOfCjpyJpy[0]) {
    return 0;
  }
  const value = rateOfCjpyJpy[0][1];
  return value ?? 0;
}

function getMarketRateOfCjpyJpy(rateOfCjpyJpy: [string, number]) {
  if (!rateOfCjpyJpy || !rateOfCjpyJpy[1]) {
    return ``;
  }

  return `${rateOfCjpyJpy[0]}:¥${formatPrice(rateOfCjpyJpy[1], 'jpy').value}\n`;
}

export default function Dashboad() {
  const { tvl, tcr, rateOfEthJpy, totalSupplyOfCjpy, rateOfCjpyJpy } =
    useYamatoStateForDashboard();

  return (
    <>
      <HeaderBox1>
        <CategoryTitle>Yamato Statistics</CategoryTitle>
      </HeaderBox1>
      <ConentBox>
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem colSpan={1}>
            <VStack align="start">
              <DashboadItem
                title={'TVL'}
                stat={`${formatPrice(tvl, 'eth').value} ${
                  YAMATO_SYMBOL.COLLATERAL
                }`}
              />
              <DashboadItem title={'TCR'} stat={`${tcr.toFixed(2)}%`} />
              <DashboadItem
                title={'CJPYプライス'}
                stat={`¥${
                  formatPrice(getRateOfCjpyJpy(rateOfCjpyJpy), 'jpy').value
                }`}
              />
              <DashboadItem
                title={'市場間価格差異'}
                stat={getMarketRateOfCjpyJpy(rateOfCjpyJpy[0])}
              />
              <DashboadItem
                title={''}
                stat={getMarketRateOfCjpyJpy(rateOfCjpyJpy[1])}
              />
              <DashboadItem
                title={''}
                stat={getMarketRateOfCjpyJpy(rateOfCjpyJpy[2])}
              />
            </VStack>
          </GridItem>

          <GridItem colSpan={1}>
            <VStack align="start">
              {/* v1.5 feature
            <DashboadItem title={'veYMT量'} stat={'（工事中）'} />
            <DashboadItem title={'総ファーミングスコア'} stat={'（工事中）'} /> */}
              <DashboadItem
                title={'ETHプライス'}
                stat={`¥${formatPrice(rateOfEthJpy, 'jpy').value}`}
              />
              <DashboadItem
                title={'CJPY総発行量'}
                stat={`${formatPrice(totalSupplyOfCjpy, 'jpy').value} ${
                  YAMATO_SYMBOL.YEN
                }`}
              />
            </VStack>
          </GridItem>
        </Grid>
      </ConentBox>
    </>
  );
}
