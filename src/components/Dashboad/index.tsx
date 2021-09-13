import { Box, HStack, VStack } from '@chakra-ui/react';
import { YAMATO_SYMBOL } from '../../constants/yamato';
import { useMarketState } from '../../state/market/hooks';
import { useYamatoStateForDashboard } from '../../state/yamato-entirety/hooks';
import { formatPrice } from '../../utils/prices';
import { CategoryTitle } from '../CommonItem';
import DashboadItem from './Item';

function getRateOfCjpyJpy(rateOfCjpyJpy: { [source: string]: number }) {
  const value = Object.values(rateOfCjpyJpy)[0];
  return value ?? 0;
}

function getMarketRateOfCjpyJpy(rateOfCjpyJpy: { [source: string]: number }) {
  const entries = Object.entries(rateOfCjpyJpy);
  let v = '';
  for (const entry of entries) {
    v += `${entry[0]}:¥${formatPrice(entry[1], 'jpy').value}\n`;
  }
  return v;
}

export default function Dashboad() {
  const { rateOfCjpyJpy } = useMarketState();
  const { tvl, tcr, rateOfEthJpy, totalSupplyOfCjpy } =
    useYamatoStateForDashboard();

  return (
    <>
      <Box border="1px" borderColor="gray.200" borderRadius="md" p={4}>
        <CategoryTitle>Yamato Statistics</CategoryTitle>
      </Box>
      <Box border="1px" borderColor="gray.200" borderRadius="md" p={4}>
        <HStack align="start" spacing={48}>
          <VStack>
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
              stat={getMarketRateOfCjpyJpy(rateOfCjpyJpy)}
            />
          </VStack>
          <VStack>
            {/* v1.5 feature
            <DashboadItem title={'veYMT数'} stat={'（工事中）'} />
            <DashboadItem title={'総ファーミングスコア'} stat={'（工事中）'} /> */}
            <DashboadItem
              title={'ETHプライス'}
              stat={`¥${formatPrice(rateOfEthJpy, 'jpy').value}`}
            />
            <DashboadItem
              title={'CJPY総発行数'}
              stat={`${formatPrice(totalSupplyOfCjpy, 'jpy').value} ${
                YAMATO_SYMBOL.YEN
              }`}
            />
          </VStack>
        </HStack>
      </Box>
    </>
  );
}
