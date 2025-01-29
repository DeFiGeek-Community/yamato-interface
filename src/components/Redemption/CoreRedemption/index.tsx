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
    <Grid
      templateColumns={{
        base: 'repeat(1, 1fr)',
        md: 'repeat(12, 1fr)',
      }}
      gap={4}
    >
      <GridItem
        colSpan={{
          base: 1,
          md: 2,
        }}
      >
        <ItemTitleForPledge width="150px" marginTop={24}>
          Yamato{t('redemption.coreRedemption.redemption')}
        </ItemTitleForPledge>
      </GridItem>

      <GridItem
        colSpan={{
          base: 1,
          md: 10,
        }}
      >
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
