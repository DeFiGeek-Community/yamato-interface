import { Grid, GridItem, HStack, VStack } from '@chakra-ui/react';
import { YAMATO_SYMBOL } from '../../constants/yamato';
import { useMarketState } from '../../state/market/hooks';
import { useYamatoStateForDashboard } from '../../state/yamato-entirety/hooks';
import { formatPrice } from '../../utils/prices';
import {
  CategoryTitle,
  ConentBox,
  HeaderBox1,
  ItemTitleValue,
} from '../CommonItem';
import TerminologyPopover from '../TerminologyPopover';
import DashboadItem from './Item';

function getRateOfCjpyJpy(rateOfCjpyJpy: { [source: string]: number }) {
  const value = Object.values(rateOfCjpyJpy)[0];
  return value ?? 0;
}

function getMarketRateOfCjpyJpy(rateOfCjpyJpy: [string, number]) {
  if (!rateOfCjpyJpy) {
    return ``;
  }
  return `${rateOfCjpyJpy[0]}:¥${formatPrice(rateOfCjpyJpy[1], 'jpy').value}\n`;
}

export default function Dashboad() {
  const { rateOfCjpyJpy } = useMarketState();
  const { tvl, tcr, rateOfEthJpy, totalSupplyOfCjpy } =
    useYamatoStateForDashboard();

  return (
    <>
      <HeaderBox1>
        <HStack>
          <CategoryTitle>Yamato Statistics</CategoryTitle>
          <TerminologyPopover>
            <div>
              <ItemTitleValue>TVL: 総預入額(Total Value Locked)</ItemTitleValue>
              <ItemTitleValue>
                TCR: 総担保比率(Total Collateral Ratio)
              </ItemTitleValue>
            </div>
          </TerminologyPopover>
        </HStack>
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
                stat={getMarketRateOfCjpyJpy(Object.entries(rateOfCjpyJpy)[0])}
              />
              <DashboadItem
                title={''}
                stat={getMarketRateOfCjpyJpy(Object.entries(rateOfCjpyJpy)[1])}
              />
              <DashboadItem
                title={''}
                stat={getMarketRateOfCjpyJpy(Object.entries(rateOfCjpyJpy)[2])}
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
