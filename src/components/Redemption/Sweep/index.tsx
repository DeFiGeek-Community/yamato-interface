import { Grid, GridItem, Box } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useYamatoStateForPledge } from '../../../state/yamato-entirety/hooks';
import { ItemTitleForPledge } from '../../CommonItem';
import SweepInput from './SweepInput';

export default function Sweep() {
  const {
    rateOfEthJpy,
    sweepReserve,
    sweepableCandiate,
    GRR,
    firstLoadCompleted,
  } = useYamatoStateForPledge();

  const { t } = useTranslation();

  return (
    <Grid
      templateColumns={{
        base: 'repeat(1, 1fr)',
        md: 'repeat(3, 1fr)',
      }}
      gap={4}
    >
      <GridItem maxWidth={{ base: '100%', md: '300px' }}>
        <Box my={4}>
          <ItemTitleForPledge>
            Yamato{t('redemption.sweep.subrogation')}
          </ItemTitleForPledge>
        </Box>
      </GridItem>

      <GridItem
        colSpan={{
          base: 1,
          md: 2,
        }}
      >
        <SweepInput
          rateOfEthJpy={rateOfEthJpy}
          sweepReserve={sweepReserve}
          sweepableCandiate={sweepableCandiate}
          GRR={GRR}
          firstLoadCompleted={firstLoadCompleted}
        />
      </GridItem>
    </Grid>
  );
}
