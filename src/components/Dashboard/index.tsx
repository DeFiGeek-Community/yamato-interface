import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Grid, GridItem, HStack, VStack } from '@chakra-ui/react';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
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
import DashboardItem from './Item';

function getMarketRateOfCjpyJpy(rateOfCjpyJpy: [string, number]) {
  if (!rateOfCjpyJpy) {
    return ``;
  }

  return `${rateOfCjpyJpy[0]}: ¥${
    formatPrice(rateOfCjpyJpy[1], 'jpy').value
  }\n`;
}

function getDeviationRate(rateOfCjpyJpy: [string, number]) {
  if (!rateOfCjpyJpy) {
    return `0%`;
  }

  const deviationRate = (rateOfCjpyJpy[1] - 1) * 100;
  return `${deviationRate.toLocaleString(undefined, {
    maximumFractionDigits: 2,
  })}%`;
}

export default function Dashboard() {
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

  const { t } = useTranslation();

  return (
    <>
      <HeaderBox1>
        <HStack>
          <CategoryTitle>Yamato Statistics</CategoryTitle>
          <TerminologyPopover>
            <ItemTitleValue>{t('dashboard.tvl')}</ItemTitleValue>
            <ItemTitleValue>{t('dashboard.tcr')}</ItemTitleValue>
          </TerminologyPopover>
        </HStack>
      </HeaderBox1>
      <ConentBox>
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem colSpan={1}>
            <VStack align="start">
              <DashboardItem
                title={'TVL'}
                stat={`¥${formatPrice(tvl, 'jpy').value}`}
                firstLoadCompleted={firstLoadCompleted}
              />
              <DashboardItem
                title={'TCR'}
                stat={`${tcr.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}%`}
                firstLoadCompleted={firstLoadCompleted}
              />
              <DashboardItem
                title={t('dashboard.intermarketPriceVariance')}
                stat={`${getMarketRateOfCjpyJpy(rateOfCjpyJpy[0])}
                (${getDeviationRate(rateOfCjpyJpy[0])})`}
                firstLoadCompleted={firstLoadCompleted}
              >
                {rateOfCjpyJpy[0] && (
                  <ExternalLink href={getExternalLink(rateOfCjpyJpy[0][0])}>
                    <ExternalLinkIcon />
                  </ExternalLink>
                )}
              </DashboardItem>
              {/* <DashboardItem
                title={''}
                stat={`${getMarketRateOfCjpyJpy(rateOfCjpyJpy[1])}
                (${getDeviationRate(rateOfCjpyJpy[1])})`}
                firstLoadCompleted={firstLoadCompleted}
              >
                {rateOfCjpyJpy[1] && (
                  <ExternalLink href={getExternalLink(rateOfCjpyJpy[1][0])}>
                    <ExternalLinkIcon />
                  </ExternalLink>
                )}
              </DashboardItem>
              <DashboardItem
                title={''}
                stat={`${getMarketRateOfCjpyJpy(rateOfCjpyJpy[2])}
                (${getDeviationRate(rateOfCjpyJpy[2])})`}
                firstLoadCompleted={firstLoadCompleted}
              >
                {rateOfCjpyJpy[2] && (
                  <ExternalLink href={getExternalLink(rateOfCjpyJpy[2][0])}>
                    <ExternalLinkIcon />
                  </ExternalLink>
                )}
              </DashboardItem> */}
            </VStack>
          </GridItem>

          <GridItem colSpan={1}>
            <VStack align="start">
              {/* v1.5 feature
            <DashboardItem title={'veYMT量'} stat={'（工事中）'} />
            <DashboardItem title={'総ファーミングスコア'} stat={'（工事中）'} /> */}
              <DashboardItem
                title={'ETH' + t('dashboard.price')}
                stat={`¥${formatPrice(rateOfEthJpy, 'jpy').value}`}
                firstLoadCompleted={firstLoadCompleted}
              />
              <DashboardItem
                title={'CJPY' + t('dashboard.totalSupply')}
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
