import { Box, HStack } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import Arrow from '../svgs/ArrowYen';
import CeurLogo from '../svgs/CeurLogo';
import CjpyLogo from '../svgs/CjpyLogo';
import CusdLogo from '../svgs/CusdLogo';
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
} from '../svgs/spring-components';
import { getBrightnessPerEth } from './functions';

interface Props {
  cjpyPriceRank: number;
  ethPriceRank: number;
  colorCodePerTcr: number;
}

const SwitchSpring: React.FC<{
  cjpyPriceRank: number;
  colorCode: number;
  children?: React.ReactNode;
}> = ({ cjpyPriceRank, colorCode, children }) => {
  const springColor = `hsl(${colorCode},100%,76%)`;
  switch (cjpyPriceRank) {
    case -10:
      return (
        <SpringMinus10 springcolor={springColor}>{children}</SpringMinus10>
      );
    case -9:
      return <SpringMinus9 springcolor={springColor}>{children}</SpringMinus9>;
    case -8:
      return <SpringMinus8 springcolor={springColor}>{children}</SpringMinus8>;
    case -7:
      return <SpringMinus7 springcolor={springColor}>{children}</SpringMinus7>;
    case -6:
      return <SpringMinus6 springcolor={springColor}>{children}</SpringMinus6>;
    case -5:
      return <SpringMinus5 springcolor={springColor}>{children}</SpringMinus5>;
    case -4:
      return <SpringMinus4 springcolor={springColor}>{children}</SpringMinus4>;
    case -3:
      return <SpringMinus3 springcolor={springColor}>{children}</SpringMinus3>;
    case -2:
      return <SpringMinus2 springcolor={springColor}>{children}</SpringMinus2>;
    case -1:
      return <SpringMinus1 springcolor={springColor}>{children}</SpringMinus1>;
    case 0:
      return <Spring0 springcolor={springColor}>{children}</Spring0>;
    case 1:
      return <SpringPlus1 springcolor={springColor}>{children}</SpringPlus1>;
    case 2:
      return <SpringPlus2 springcolor={springColor}>{children}</SpringPlus2>;
    case 3:
      return <SpringPlus3 springcolor={springColor}>{children}</SpringPlus3>;
    case 4:
      return <SpringPlus4 springcolor={springColor}>{children}</SpringPlus4>;
    case 5:
      return <SpringPlus5 springcolor={springColor}>{children}</SpringPlus5>;
    case 6:
      return <SpringPlus6 springcolor={springColor}>{children}</SpringPlus6>;
    case 7:
      return <SpringPlus7 springcolor={springColor}>{children}</SpringPlus7>;
    case 8:
      return <SpringPlus8 springcolor={springColor}>{children}</SpringPlus8>;
    case 9:
      return <SpringPlus9 springcolor={springColor}>{children}</SpringPlus9>;
    case 10:
      return <SpringPlus10 springcolor={springColor}>{children}</SpringPlus10>;
    default:
      return <Spring0 springcolor={springColor}>{children}</Spring0>;
  }
};

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
  const { currency } = useCurrency();

  const background = useMemo(
    () => switchBackgroundColor(ethPriceRank),
    [ethPriceRank]
  );
  return (
    <Box
      border="2px solid #5bad92"
      style={{
        background,
      }}
    >
      <HStack>
        <div style={{ margin: 'auto 0.5rem auto auto' }}>
          <Arrow />
        </div>
        <div style={{ margin: 'auto auto auto 0' }}>
          <SwitchSpring
            cjpyPriceRank={cjpyPriceRank}
            colorCode={colorCodePerTcr}
          >
            {currency == 'CJPY' ? (
              <CjpyLogo width={'45px'} height={'45px'} />
            ) : currency == 'CUSD' ? (
              <CusdLogo width={'45px'} height={'45px'} />
            ) : currency == 'CEUR' ? (
              <CeurLogo width={'45px'} height={'45px'} />
            ) : (
              <CjpyLogo width={'45px'} height={'45px'} />
            )}
          </SwitchSpring>
        </div>
      </HStack>
    </Box>
  );
}
