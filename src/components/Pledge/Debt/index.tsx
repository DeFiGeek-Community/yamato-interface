import { Grid, GridItem } from '@chakra-ui/react';
import { YAMATO_SYMBOL } from '../../../constants/yamato';
import { usePledgeData } from '../../../state/pledge/hooks';
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
  const collateralBasedJpy = collateral * rateOfEthJpy;
  const ICR = collateralBasedJpy / debt;
  if (ICR - MCR <= 0) {
    return 0;
  }

  const borrowableAmount = collateralBasedJpy / (debt * (MCR / 100));
  return borrowableAmount;
}

export default function Debt() {
  const { rateOfEthJpy, MCR } = useYamatoStateForPledge();
  const { collateral, debt } = usePledgeData();

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
          {formatPrice(debt, 'jpy').value}
          {YAMATO_SYMBOL.YEN}
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
        />
      </GridItem>

      <GridItem colSpan={1}>
        <ItemTitleForPledge marginTop={26}>担保率</ItemTitleForPledge>
      </GridItem>
      <GridItem colSpan={1}>
        <ItemTitleValue marginTop={26}>
          {formatCollateralizationRatio(collateral * rateOfEthJpy, debt)}%
        </ItemTitleValue>
      </GridItem>
      <GridItem colSpan={5}>
        <div style={{ marginTop: '32px', textAlign: 'right' }}>
          <Text>
            最大借入可能量...
            {
              formatPrice(
                getBorrowableAmount(collateral, debt, rateOfEthJpy, MCR),
                'jpy'
              ).value
            }
            {YAMATO_SYMBOL.YEN}
          </Text>
        </div>
      </GridItem>
    </Grid>
  );
}
