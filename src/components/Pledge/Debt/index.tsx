import { Grid, GridItem, Skeleton, Box } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { YAMATO_SYMBOL } from '../../../constants/yamato';
import { usePledgeData } from '../../../state/pledge/hooks';
import { useWalletState } from '../../../state/wallet/hooks';
import { useYamatoStateForPledge } from '../../../state/yamato-entirety/hooks';
import {
  formatCollateralizationRatio,
  formatPrice,
} from '../../../utils/prices';
import { ItemTitleValue, ItemTitleForPledge } from '../../CommonItem';
import BorrowInput from './BorrowingInput';
import RepayInput from './RepayInput';

function getBorrowableAmount(
  collateral: number,
  debt: number,
  rateOfEthJpy: number,
  MCR: number
) {
  if (MCR <= 0) {
    return 0;
  }
  const collateralBasedJpy = collateral * rateOfEthJpy;
  const MCR2 = MCR / 100;
  if (debt > 0) {
    const ICR = collateralBasedJpy / debt;
    if (ICR - MCR2 <= 0) {
      return 0;
    }
  }

  // coll / (debt + x) = MCR  ->  x = (coll - debt * MCR) / MCR
  const borrowableAmount = (collateralBasedJpy - debt * MCR2) / MCR2;
  return borrowableAmount;
}

export default function Debt() {
  const { rateOfEthJpy, MCR, firstLoadCompleted } = useYamatoStateForPledge();
  const { collateral, debt } = usePledgeData();
  const { cjpy } = useWalletState();
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
        <GridItem my={4} maxWidth={{ base: '400px', md: '100%' }}>
          <Grid templateRows="repeat(3, 1fr)" gap={4}>
            <Box mt={8}>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <Box>
                  <ItemTitleForPledge>
                    {t('pledge.debt.maximumBorrowableAmount')}
                  </ItemTitleForPledge>
                </Box>
                <Box>
                  <ItemTitleValue>
                    {firstLoadCompleted ? (
                      <>
                        {
                          formatPrice(
                            getBorrowableAmount(
                              collateral,
                              debt,
                              rateOfEthJpy,
                              MCR
                            ),
                            'jpy'
                          ).value
                        }
                        {` `}
                        {YAMATO_SYMBOL.YEN}
                      </>
                    ) : (
                      <Skeleton height="1.4rem" width="7rem" />
                    )}
                  </ItemTitleValue>
                </Box>
              </Grid>
            </Box>

            <Box mt={8}>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <Box>
                  <ItemTitleForPledge>
                    {t('pledge.debt.borrowBalance')}
                  </ItemTitleForPledge>
                </Box>
                <Box>
                  <ItemTitleValue data-testid="borrowing-data-currentAmount">
                    {firstLoadCompleted ? (
                      <>
                        {formatPrice(debt, 'jpy').value}
                        {` `}
                        {YAMATO_SYMBOL.YEN}
                      </>
                    ) : (
                      <Skeleton height="1.4rem" width="7rem" />
                    )}
                  </ItemTitleValue>
                </Box>
              </Grid>
            </Box>

            <Box mt={8}>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <Box>
                  <ItemTitleForPledge>
                    {t('pledge.debt.collateralRate')}
                  </ItemTitleForPledge>
                </Box>
                <Box>
                  <ItemTitleValue>
                    {firstLoadCompleted ? (
                      <>
                        {formatCollateralizationRatio(
                          collateral * rateOfEthJpy,
                          debt
                        )}
                        %
                      </>
                    ) : (
                      <Skeleton height="1.4rem" width="7rem" />
                    )}
                  </ItemTitleValue>
                </Box>
              </Grid>
            </Box>
          </Grid>
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
            mt={8}
            ml={{
              base: 6,
              md: 0,
            }}
          >
            <Box>
              <BorrowInput
                collateral={collateral}
                debt={debt}
                rateOfEthJpy={rateOfEthJpy}
                MCR={MCR}
              />
            </Box>

            <Box mt={{ base: 6, md: 0 }}>
              <RepayInput
                collateral={collateral}
                debt={debt}
                rateOfEthJpy={rateOfEthJpy}
                cjpy={cjpy}
              />
            </Box>
          </Grid>
        </GridItem>
      </Grid>
    </>
  );
}
