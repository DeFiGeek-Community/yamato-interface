import { Grid, GridItem } from '@chakra-ui/react';
import { useActiveWeb3React } from '../../../hooks/web3';
import { useYamatoStateForPledge } from '../../../state/yamato-entirety/hooks';
import { ItemTitleForPledge } from '../../CommonItem';
import SweepInput from './SweepInput';

export default function YamatoSubrogation() {
  const { account, library } = useActiveWeb3React();

  const { rateOfEthJpy, sweepReserve, sweepableCandiate } =
    useYamatoStateForPledge();

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={4}>
      <GridItem colSpan={1}>
        <ItemTitleForPledge marginTop={32}>Yamato代位弁済</ItemTitleForPledge>
      </GridItem>

      <GridItem colSpan={3}>
        <SweepInput
          rateOfEthJpy={rateOfEthJpy}
          sweepReserve={sweepReserve}
          sweepableCandiate={sweepableCandiate}
        />
      </GridItem>
    </Grid>
  );
}
