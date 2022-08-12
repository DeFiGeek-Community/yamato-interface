import { Grid, GridItem } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useYamatoStateForPledge } from '../../../state/yamato-entirety/hooks';
import { ItemTitleForPledge } from '../../CommonItem';
import RedemptionInput from './RedemptionInput';

export default function SelfRedemption() {
  const { redeemableCandidate, rateOfEthJpy, GRR, firstLoadCompleted } =
    useYamatoStateForPledge();
  const { t } = useTranslation();

  return (
    <Grid templateColumns="repeat(6, 1fr)" gap={4} mb={12}>
      <GridItem colSpan={1}>
        <ItemTitleForPledge width="150px" marginTop={26}>
          {t('redemption.selfRedemption.redemption')}
        </ItemTitleForPledge>
      </GridItem>

      <GridItem colSpan={5}>
        <RedemptionInput
          redeemableCandidate={redeemableCandidate}
          rateOfEthJpy={rateOfEthJpy}
          GRR={GRR}
          firstLoadCompleted={firstLoadCompleted}
        />
      </GridItem>
    </Grid>
  );
}
