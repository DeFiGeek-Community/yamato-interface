import { Box } from '@chakra-ui/react';
import { formatPrice } from '../../utils/prices';
import { ItemTitleForInfographics } from '../CommonItem';
import { Thermometer } from '../svgs/thermometer-adjusted';

interface Props {
  tcr: number;
}

export default function Tcr(props: Props) {
  const { tcr } = props;

  return (
    <Box border="2px solid #5bad92">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        p={1}
      >
        <ItemTitleForInfographics>TCR</ItemTitleForInfographics>
        <ItemTitleForInfographics>{tcr.toFixed(2)}%</ItemTitleForInfographics>
      </Box>
      <div>
        <Thermometer />
      </div>
    </Box>
  );
}
