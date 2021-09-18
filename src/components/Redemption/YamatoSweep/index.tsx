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
    <Grid templateColumns="repeat(6, 1fr)" gap={4}>
      <GridItem colSpan={1}>
        <ItemTitleForPledge width="150px" marginTop={26}>
          Yamato代位弁済
        </ItemTitleForPledge>
      </GridItem>

      <GridItem colSpan={5}>
        <SweepInput
          rateOfEthJpy={rateOfEthJpy}
          sweepReserve={sweepReserve}
          sweepableCandiate={sweepableCandiate}
        />
      </GridItem>
    </Grid>
  );
}
