import { Grid, GridItem, Box } from '@chakra-ui/react';
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
        md: 'repeat(3, 1fr)',
      }}
      gap={4}
      mb={8}
    >
      <GridItem maxWidth={{ base: '100%', md: '300px' }}>
        <Box my={4}>
          <ItemTitleForPledge>
            Yamato{t('redemption.coreRedemption.redemption')}
          </ItemTitleForPledge>
        </Box>
      </GridItem>

      <GridItem
        colSpan={{
          base: 1,
          md: 2,
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
