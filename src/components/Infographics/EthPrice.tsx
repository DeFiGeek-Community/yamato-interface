import { Box } from '@chakra-ui/react';
import { formatPrice } from '../../utils/prices';
import { ItemTitleForInfographics } from '../CommonItem';
import ArrowDown from '../svgs/eth-change-arrow-adjusted/EthChangeArrowDown.js';
import ArrowUp from '../svgs/eth-change-arrow-adjusted/EthChangeArrowUp.js';
import ArrowZero from '../svgs/eth-change-arrow-adjusted/EthChangeArrowZero.js';
import { getBrightnessPerEth } from './functions';

interface Props {
  ethPrice: number;
  ethPriceRank: number;
}

function renderArrow(ethPriceRank: number) {
  const brightness = getBrightnessPerEth(ethPriceRank);
  if (ethPriceRank > 0) {
    return <ArrowUp color={`hsl(360, 100%, ${brightness}%)`} />;
  } else if (ethPriceRank < 0) {
    return <ArrowDown color={`hsl(236, 100%, ${brightness}%)`} />;
  } else {
    return <ArrowZero color={`hsl(298, 100%, ${brightness}%)`} />;
  }
}

export default function EthPrice(props: Props) {
  const { ethPrice, ethPriceRank } = props;

  return (
    <Box border="2px solid #5bad92">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        p={1}
      >
        <ItemTitleForInfographics>ETH</ItemTitleForInfographics>
        <ItemTitleForInfographics>
          ¥{formatPrice(ethPrice, 'jpy').value}
        </ItemTitleForInfographics>
      </Box>
      <div>{renderArrow(ethPriceRank)}</div>
    </Box>
  );
}
