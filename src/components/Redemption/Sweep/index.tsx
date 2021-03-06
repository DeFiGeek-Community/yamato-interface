import { Grid, GridItem } from '@chakra-ui/react';
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

  return (
    <Grid templateColumns="repeat(6, 1fr)" gap={4}>
      <GridItem colSpan={1}>
        <ItemTitleForPledge width="150px" marginTop={24}>
          Yamato代位弁済
        </ItemTitleForPledge>
      </GridItem>

      <GridItem colSpan={5}>
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
