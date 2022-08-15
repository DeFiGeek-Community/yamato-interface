import { Grid, GridItem, Skeleton } from '@chakra-ui/react';
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
      <Grid templateColumns="repeat(8, 1fr)" gap={4} mb={4}>
        <GridItem colSpan={1}>
          <ItemTitleForPledge marginTop={26}>
            {t('pledge.debt.maximumBorrowableAmount')}
          </ItemTitleForPledge>
        </GridItem>
        <GridItem colSpan={2}>
          <ItemTitleValue marginTop={26}>
            {firstLoadCompleted ? (
              <>
                {
                  formatPrice(
                    getBorrowableAmount(collateral, debt, rateOfEthJpy, MCR),
                    'jpy'
                  ).value
                }
                {` `}
                {YAMATO_SYMBOL.YEN}
              </>
            ) : (
              <Skeleton
                height="1.4rem"
                width="7rem"
                style={{
                  lineHeight: '1.4rem',
                }}
              />
            )}
          </ItemTitleValue>
        </GridItem>
      </Grid>
      <Grid templateColumns="repeat(16, 1fr)" gap={4} mb={4}>
        <GridItem colSpan={2}>
          <ItemTitleForPledge marginTop={26}>
            {t('pledge.debt.borrowBalance')}
          </ItemTitleForPledge>
        </GridItem>

        <GridItem colSpan={3}>
          <ItemTitleValue
            marginTop={26}
            data-testid="borrowing-data-currentAmount"
          >
            {firstLoadCompleted ? (
              <>
                {formatPrice(debt, 'jpy').value}
                {` `}
                {YAMATO_SYMBOL.YEN}
              </>
            ) : (
              <Skeleton
                height="1.4rem"
                width="7rem"
                style={{
                  lineHeight: '1.4rem',
                }}
              />
            )}
          </ItemTitleValue>
        </GridItem>

        <GridItem colSpan={5}>
          <BorrowInput
            collateral={collateral}
            debt={debt}
            rateOfEthJpy={rateOfEthJpy}
            MCR={MCR}
          />
        </GridItem>

        <GridItem colSpan={6}>
          <RepayInput
            collateral={collateral}
            debt={debt}
            rateOfEthJpy={rateOfEthJpy}
            cjpy={cjpy}
          />
        </GridItem>
      </Grid>
      <Grid templateColumns="repeat(8, 1fr)" gap={4} mb={4}>
        <GridItem colSpan={1}>
          <ItemTitleForPledge marginTop={26}>
            {t('pledge.debt.collateralRate')}
          </ItemTitleForPledge>
        </GridItem>
        <GridItem colSpan={1}>
          <ItemTitleValue marginTop={26}>
            {firstLoadCompleted ? (
              <>
                {formatCollateralizationRatio(collateral * rateOfEthJpy, debt)}%
              </>
            ) : (
              <Skeleton
                height="1.4rem"
                width="7rem"
                style={{
                  lineHeight: '1.4rem',
                }}
              />
            )}
          </ItemTitleValue>
        </GridItem>
      </Grid>
    </>
  );
}
