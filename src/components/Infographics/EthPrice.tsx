import { Box } from '@chakra-ui/react';
import ArrowZero from '../../assets/sources/eth-change-arrow/eth-change-arrow-zero.svg';
import { formatPrice } from '../../utils/prices';
import { ItemTitleForInfographics } from '../CommonItem';
import ArrowDown from '../svgs/eth-change-arrow-adjusted/EthChangeArrowDown.js';
import ArrowUp from '../svgs/eth-change-arrow-adjusted/EthChangeArrowUp.js';
import { getBrightnessPerEth } from './functions';

interface Props {
  ethPrice: number;
  ethPriceRank: number;
}

function renderArrow(ethPriceRank: number) {
  const brightness = getBrightnessPerEth(ethPriceRank);
  const style = { margin: 'auto' };
  if (ethPriceRank > 0) {
    return <ArrowUp color={`hsl(360, 100%, ${brightness}%)`} style={style} />;
  } else if (ethPriceRank < 0) {
    return <ArrowDown color={`hsl(236, 100%, ${brightness}%)`} style={style} />;
  } else {
    return <img src={ArrowZero} style={{ ...style, height: '50px' }} />;
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
