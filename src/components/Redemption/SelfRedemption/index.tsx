import { Grid, GridItem } from '@chakra-ui/react';
import { useYamatoStateForPledge } from '../../../state/yamato-entirety/hooks';
import { ItemTitleForPledge } from '../../CommonItem';
import RedemptionInput from './RedemptionInput';

export default function SelfRedemption() {
  const yamato = useYamatoStateForPledge();

  return (
    <Grid templateColumns="repeat(6, 1fr)" gap={4} mb={12}>
      <GridItem colSpan={1}>
        <ItemTitleForPledge width="150px" marginTop={26}>
          償還
        </ItemTitleForPledge>
      </GridItem>

      <GridItem colSpan={5}>
        <RedemptionInput
          totalCollateral={yamato.totalCollateral}
          totalDebt={yamato.totalDebt}
          tcr={yamato.tcr}
          rateOfEthJpy={yamato.rateOfEthJpy}
        />
      </GridItem>
    </Grid>
  );
}
