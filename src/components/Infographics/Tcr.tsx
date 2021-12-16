import { Box } from '@chakra-ui/react';
import { ItemTitleForInfographics } from '../CommonItem';
import { Thermometer } from '../svgs/thermometer-with-props';
import { getTcrRate } from './functions';

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
        <ItemTitleForInfographics>
          {tcr.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}
          %
        </ItemTitleForInfographics>
      </Box>
      <div style={{ textAlign: 'center' }}>
        <Thermometer
          rate={getTcrRate(tcr)}
          style={{ display: 'inline-block' }}
        />
      </div>
    </Box>
  );
}
