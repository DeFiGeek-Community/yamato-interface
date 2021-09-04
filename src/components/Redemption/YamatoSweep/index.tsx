import { Grid, GridItem } from '@chakra-ui/react';
import { useActiveWeb3React } from '../../../hooks/web3';
import { useYamatoStateForPledge } from '../../../state/yamato-entirety/hooks';
import { ItemTitleForPledge } from '../../CommonItem';
import SweepInput from './SweepInput';

export default function YamatoSubrogation() {
  const { account, library } = useActiveWeb3React();

  const yamato = useYamatoStateForPledge();

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={4}>
      <GridItem colSpan={1}>
        <ItemTitleForPledge marginTop={32}>Yamato代位弁済</ItemTitleForPledge>
      </GridItem>

      <GridItem colSpan={3}>
        <SweepInput
          totalCollateral={yamato.totalCollateral}
          totalDebt={yamato.totalDebt}
          tcr={yamato.tcr}
          rateOfEthJpy={yamato.rateOfEthJpy}
          redemptionReserve={yamato.redemptionReserve}
          sweepReserve={yamato.sweepReserve}
          sweepableCandiate={yamato.sweepableCandiate}
        />
      </GridItem>
    </Grid>
  );
}
