import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Grid, GridItem, HStack, VStack } from '@chakra-ui/react';
import { useCallback, useMemo } from 'react';
import { CJPY_ADDRESSES } from '../../constants/addresses';
import { YAMATO_SYMBOL } from '../../constants/yamato';
import { useActiveWeb3React } from '../../hooks/web3';
import { useYamatoStateForDashboard } from '../../state/yamato-entirety/hooks';
import { formatPrice } from '../../utils/prices';
import {
  CategoryTitle,
  ConentBox,
  HeaderBox1,
  ItemTitleValue,
} from '../CommonItem';
import { ExternalLink } from '../ExternalLink';
import TerminologyPopover from '../TerminologyPopover';
import DashboadItem from './Item';

function getRateOfCjpyJpy(rateOfCjpyJpy: [string, number][]) {
  if (!rateOfCjpyJpy[0]) {
    return 0;
  }
  const value = rateOfCjpyJpy[0][1];
  return value ?? 0;
}

function getMarketRateOfCjpyJpy(rateOfCjpyJpy: [string, number]) {
  if (!rateOfCjpyJpy) {
    return ``;
  }

  return `${rateOfCjpyJpy[0]}: ¥${
    formatPrice(rateOfCjpyJpy[1], 'jpy').value
  }\n`;
}

export default function Dashboad() {
  const {
    tvl,
    tcr,
    rateOfEthJpy,
    totalSupplyOfCjpy,
    rateOfCjpyJpy,
    firstLoadCompleted,
  } = useYamatoStateForDashboard();

  const { chainId } = useActiveWeb3React();
  const cjpyAddress = useMemo(
    () => (chainId != null ? CJPY_ADDRESSES[chainId] : ''),
    [chainId]
  );

  const getExternalLink = useCallback(
    (exchangeName: string) => {
      if (exchangeName.includes('uniswap')) {
        return `https://app.uniswap.org/#/swap?inputCurrency=eth&outputCurrency=${cjpyAddress}`;
      }
      return '';
    },
    [cjpyAddress]
  );

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
                stat={`¥${formatPrice(tvl, 'jpy').value}`}
                firstLoadCompleted={firstLoadCompleted}
              />
              <DashboadItem
                title={'TCR'}
                stat={`${tcr.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}%`}
                firstLoadCompleted={firstLoadCompleted}
              />
              <DashboadItem
                title={'CJPYプライス'}
                stat={`¥${
                  formatPrice(getRateOfCjpyJpy(rateOfCjpyJpy), 'jpy').value
                }`}
                firstLoadCompleted={firstLoadCompleted}
              />
              <DashboadItem
                title={'市場間価格差異'}
                stat={getMarketRateOfCjpyJpy(rateOfCjpyJpy[0])}
                firstLoadCompleted={true}
              >
                {rateOfCjpyJpy[0] && (
                  <ExternalLink href={getExternalLink(rateOfCjpyJpy[0][0])}>
                    <ExternalLinkIcon />
                  </ExternalLink>
                )}
              </DashboadItem>
              <DashboadItem
                title={''}
                stat={getMarketRateOfCjpyJpy(rateOfCjpyJpy[1])}
                firstLoadCompleted={true}
              />
              <DashboadItem
                title={''}
                stat={getMarketRateOfCjpyJpy(rateOfCjpyJpy[2])}
                firstLoadCompleted={true}
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
                firstLoadCompleted={firstLoadCompleted}
              />
              <DashboadItem
                title={'CJPY総発行量'}
                stat={`${formatPrice(totalSupplyOfCjpy, 'jpy').value} ${
                  YAMATO_SYMBOL.YEN
                }`}
                firstLoadCompleted={firstLoadCompleted}
              />
            </VStack>
          </GridItem>
        </Grid>
      </ConentBox>
    </>
  );
}
