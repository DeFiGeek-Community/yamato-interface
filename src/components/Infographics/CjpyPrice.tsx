import { Box, Grid, GridItem } from '@chakra-ui/react';
import Arrow from '../svgs/ArrowYen';
import {
  Spring0,
  SpringMinus1,
  SpringMinus10,
  SpringMinus2,
  SpringMinus3,
  SpringMinus4,
  SpringMinus5,
  SpringMinus6,
  SpringMinus7,
  SpringMinus8,
  SpringMinus9,
  SpringPlus1,
  SpringPlus10,
  SpringPlus2,
  SpringPlus3,
  SpringPlus4,
  SpringPlus5,
  SpringPlus6,
  SpringPlus7,
  SpringPlus8,
  SpringPlus9,
} from '../svgs/spring-adjusted';
import { getBrightnessPerEth } from './functions';

interface Props {
  cjpyPriceRank: number;
  ethPriceRank: number;
  colorCodePerTcr: number;
}

function switchSpring(cjpyPriceRank: number, colorCode: number) {
  const springColor = `hsl(${colorCode},100%,76%)`;
  switch (cjpyPriceRank) {
    case -10:
      return <SpringMinus10 springColor={springColor} />;
    case -9:
      return <SpringMinus9 springColor={springColor} />;
    case -8:
      return <SpringMinus8 springColor={springColor} />;
    case -7:
      return <SpringMinus7 springColor={springColor} />;
    case -6:
      return <SpringMinus6 springColor={springColor} />;
    case -5:
      return <SpringMinus5 springColor={springColor} />;
    case -4:
      return <SpringMinus4 springColor={springColor} />;
    case -3:
      return <SpringMinus3 springColor={springColor} />;
    case -2:
      return <SpringMinus2 springColor={springColor} />;
    case -1:
      return <SpringMinus1 springColor={springColor} />;
    case 0:
      return <Spring0 springColor={springColor} />;
    case 1:
      return <SpringPlus1 springColor={springColor} />;
    case 2:
      return <SpringPlus2 springColor={springColor} />;
    case 3:
      return <SpringPlus3 springColor={springColor} />;
    case 4:
      return <SpringPlus4 springColor={springColor} />;
    case 5:
      return <SpringPlus5 springColor={springColor} />;
    case 6:
      return <SpringPlus6 springColor={springColor} />;
    case 7:
      return <SpringPlus7 springColor={springColor} />;
    case 8:
      return <SpringPlus8 springColor={springColor} />;
    case 9:
      return <SpringPlus9 springColor={springColor} />;
    case 10:
      return <SpringPlus10 springColor={springColor} />;
    default:
      return <Spring0 springColor={springColor} />;
  }
}

function switchBackgroundColor(ethPriceRank: number) {
  const brightness = getBrightnessPerEth(ethPriceRank); // Max95% - Min50%
  if (ethPriceRank > 0) {
    return `linear-gradient(180deg, hsla(360, 0%, 100%, 0) 0%, hsl(360, 100%, ${brightness}%) 100%)`;
  } else if (ethPriceRank < 0) {
    return `linear-gradient(180deg, hsla(236, 0%, 100%, 0) 0%, hsl(236, 100%, ${brightness}%) 100%)`;
  } else {
    return `linear-gradient(180deg, hsla(298, 0%, 100%, 0) 0%, hsl(298, 100%, 95%) 100%)`;
  }
}

export default function CjpyPrice(props: Props) {
  const { cjpyPriceRank, ethPriceRank, colorCodePerTcr } = props;
  return (
    <Box
      border="2px solid #5bad92"
      style={{
        background: switchBackgroundColor(ethPriceRank),
      }}
    >
      <Grid templateColumns="repeat(2, 1fr)">
        <GridItem colSpan={1} style={{ display: 'flex', alignItems: 'center' }}>
          <Arrow />
        </GridItem>
        <GridItem colSpan={1}>
          {switchSpring(cjpyPriceRank, colorCodePerTcr)}
        </GridItem>
      </Grid>
    </Box>
  );
}
