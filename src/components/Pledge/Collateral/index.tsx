import { Grid, GridItem, Skeleton, Box } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { YAMATO_SYMBOL } from '../../../constants/yamato';
import { usePledgeData } from '../../../state/pledge/hooks';
import { useYamatoStateForPledge } from '../../../state/yamato-entirety/hooks';
import { multiplyToNum } from '../../../utils/bignumber';
import { formatPrice } from '../../../utils/prices';
import { ItemTitleForPledge, ItemTitleValue } from '../../CommonItem';
import DepositInput from './DepositInput';
import WithdrawalInput from './WithdrawalInput';

export default function Collateral() {
  const { rateOfEthJpy, firstLoadCompleted } = useYamatoStateForPledge();
  const { collateral, debt } = usePledgeData();
  const { t } = useTranslation();

  return (
    <>
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
        gap={4}
      >
        <GridItem maxWidth={{ base: '400px', md: '100%' }}>
          <Box my={4}>
            <Grid templateColumns="repeat(2, 1fr)" gap={4} mt={6}>
              <Box>
                <ItemTitleForPledge>
                  {t('pledge.collateral.collateralBalance')}
                </ItemTitleForPledge>
              </Box>
              <Box>
                <ItemTitleValue data-testid="collateral-data-currentAmount">
                  {firstLoadCompleted ? (
                    <>
                      {formatPrice(collateral, 'eth').value}
                      {` `}
                      {YAMATO_SYMBOL.COLLATERAL}
                    </>
                  ) : (
                    <Skeleton height="1.4rem" width="7rem" />
                  )}
                </ItemTitleValue>
              </Box>
            </Grid>

            <Grid templateColumns="repeat(2, 1fr)" gap={4} mt={8}>
              <Box>
                <ItemTitleForPledge>
                  {t('pledge.collateral.valuation')}
                </ItemTitleForPledge>
              </Box>
              <Box>
                <ItemTitleValue>
                  {firstLoadCompleted ? (
                    <>
                      ¥
                      {
                        formatPrice(
                          multiplyToNum(collateral, rateOfEthJpy),
                          'jpy'
                        ).value
                      }
                    </>
                  ) : (
                    <Skeleton height="1.4rem" width="7rem" />
                  )}
                </ItemTitleValue>
              </Box>
            </Grid>
          </Box>
        </GridItem>

        <GridItem
          colSpan={{
            base: 1,
            md: 2,
          }}
        >
          <Grid
            templateColumns={{
              base: 'repeat(1, 1fr)',
              md: 'repeat(2, 1fr)',
            }}
            gap={4}
            mt={4}
            ml={{
              base: 6,
              md: 0,
            }}
          >
            <Box>
              <DepositInput
                collateral={collateral}
                debt={debt}
                rateOfEthJpy={rateOfEthJpy}
              />
            </Box>

            <Box mt={{ base: 6, md: 0 }}>
              <WithdrawalInput
                collateral={collateral}
                debt={debt}
                rateOfEthJpy={rateOfEthJpy}
              />
            </Box>
          </Grid>
        </GridItem>
      </Grid>
    </>
  );
}
