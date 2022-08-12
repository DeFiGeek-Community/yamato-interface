import { Grid, GridItem } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useYamatoStateForPledge } from '../../../state/yamato-entirety/hooks';
import { ItemTitleForPledge } from '../../CommonItem';
import RedemptionInput from './RedemptionInput';

export default function CoreRedemption() {
  const {
    rateOfEthJpy,
    redemptionReserve,
    redeemableCandidate,
    GRR,
    firstLoadCompleted,
  } = useYamatoStateForPledge();

  const { t } = useTranslation();

  return (
    <Grid templateColumns="repeat(6, 1fr)" gap={4} mb={12}>
      <GridItem colSpan={1}>
        <ItemTitleForPledge width="150px" marginTop={25}>
          Yamato{t('redemption.coreRedemption.redemption')}
        </ItemTitleForPledge>
      </GridItem>

      <GridItem colSpan={5}>
        <RedemptionInput
          rateOfEthJpy={rateOfEthJpy}
          redemptionReserve={redemptionReserve}
          redeemableCandidate={redeemableCandidate}
          GRR={GRR}
          firstLoadCompleted={firstLoadCompleted}
        />
      </GridItem>
    </Grid>
  );
}
