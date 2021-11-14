import { Grid, GridItem, Skeleton } from '@chakra-ui/react';
import { YAMATO_SYMBOL } from '../../../constants/yamato';
import { usePledgeData } from '../../../state/pledge/hooks';
import { useWalletState } from '../../../state/wallet/hooks';
import { useYamatoStateForPledge } from '../../../state/yamato-entirety/hooks';
import {
  formatCollateralizationRatio,
  formatPrice,
} from '../../../utils/prices';
import { ItemTitleValue, ItemTitleForPledge, Text } from '../../CommonItem';
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

  return (
    <Grid templateColumns="repeat(8, 1fr)" gap={4} mb={4}>
      <GridItem colSpan={1}>
        <ItemTitleForPledge marginTop={26}>借入量</ItemTitleForPledge>
      </GridItem>

      <GridItem colSpan={1}>
        <ItemTitleValue
          marginTop={26}
          data-testid="borrowing-data-currentAmount"
        >
          {firstLoadCompleted ? (
            <>
              {formatPrice(debt, 'jpy').value}
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

      <GridItem colSpan={3}>
        <BorrowInput
          collateral={collateral}
          debt={debt}
          rateOfEthJpy={rateOfEthJpy}
          MCR={MCR}
        />
      </GridItem>

      <GridItem colSpan={3}>
        <RepayInput
          collateral={collateral}
          debt={debt}
          rateOfEthJpy={rateOfEthJpy}
          cjpy={cjpy}
        />
      </GridItem>

      <GridItem colSpan={1}>
        <ItemTitleForPledge marginTop={26}>担保率</ItemTitleForPledge>
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
      <GridItem colSpan={5}>
        <div style={{ marginTop: '32px', textAlign: 'right' }}>
          <Text>
            最大借入可能量...
            {firstLoadCompleted ? (
              <>
                {
                  formatPrice(
                    getBorrowableAmount(collateral, debt, rateOfEthJpy, MCR),
                    'jpy'
                  ).value
                }
              </>
            ) : (
              <Skeleton
                height="1.4rem"
                width="5rem"
                style={{
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  lineHeight: '1.4rem',
                }}
              />
            )}
            {YAMATO_SYMBOL.YEN}
          </Text>
        </div>
      </GridItem>
    </Grid>
  );
}
