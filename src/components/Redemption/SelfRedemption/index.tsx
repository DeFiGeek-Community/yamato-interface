import { Grid, GridItem, Box } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useYamatoStateForPledge } from '../../../state/yamato-entirety/hooks';
import { ItemTitleForPledge } from '../../CommonItem';
import RedemptionInput from './RedemptionInput';

export default function SelfRedemption() {
  const { redeemableCandidate, rateOfEthJpy, GRR, firstLoadCompleted } =
    useYamatoStateForPledge();
  const { t } = useTranslation();

  return (
    <Grid
      templateColumns={{
        base: 'repeat(1, 1fr)',
        md: 'repeat(3, 1fr)',
      }}
      gap={4}
      mt={2}
      mb={8}
    >
      <GridItem maxWidth={{ base: '100%', md: '300px' }}>
        <Box my={4}>
          <ItemTitleForPledge>
            {t('redemption.selfRedemption.redemption')}
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
          redeemableCandidate={redeemableCandidate}
          rateOfEthJpy={rateOfEthJpy}
          GRR={GRR}
          firstLoadCompleted={firstLoadCompleted}
        />
      </GridItem>
    </Grid>
  );
}
