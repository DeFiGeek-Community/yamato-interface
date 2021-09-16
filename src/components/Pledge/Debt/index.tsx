import { Grid, GridItem } from '@chakra-ui/react';
import { MCR, YAMATO_SYMBOL } from '../../../constants/yamato';
import { useActiveWeb3React } from '../../../hooks/web3';
import { usePledgeData } from '../../../state/pledge/hooks';
import { useYamatoStateForPledge } from '../../../state/yamato-entirety/hooks';
import {
  formatCollateralizationRatio,
  formatPrice,
} from '../../../utils/prices';
import { CurrentValue, ItemTitleForPledge } from '../../CommonItem';
import BorrowInput from './BorrowingInput';
import RepayInput from './RepayInput';

function getBorrowableAmount(
  collateral: number,
  debt: number,
  rateOfEthJpy: number
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
  const { account, library } = useActiveWeb3React();

  const { rateOfEthJpy } = useYamatoStateForPledge();
  const { collateral, debt } = usePledgeData();

  return (
    <Grid templateColumns="repeat(8, 1fr)" gap={4} mb={4}>
      <GridItem colSpan={1}>
        <ItemTitleForPledge marginTop={32}>借入量</ItemTitleForPledge>
      </GridItem>

      <GridItem colSpan={1}>
        <CurrentValue marginTop={32} data-testid="borrowing-data-currentAmount">
          {debt}
          {YAMATO_SYMBOL.YEN}
        </CurrentValue>
      </GridItem>

      <GridItem colSpan={3}>
        <BorrowInput collateral={collateral} debt={debt} />
      </GridItem>

      <GridItem colSpan={3}>
        <RepayInput collateral={collateral} debt={debt} />
      </GridItem>

      <GridItem colSpan={1}>
        <ItemTitleForPledge marginTop={32}>担保率</ItemTitleForPledge>
      </GridItem>
      <GridItem colSpan={1}>
        <CurrentValue marginTop={32}>
          {formatCollateralizationRatio(collateral, debt)}%
        </CurrentValue>
      </GridItem>
      <GridItem colSpan={4}>
        <CurrentValue marginTop={32} width={'100%'}>
          最大借入可能量...
          {
            formatPrice(
              getBorrowableAmount(collateral, debt, rateOfEthJpy),
              'jpy'
            ).value
          }
          {YAMATO_SYMBOL.YEN}
        </CurrentValue>
      </GridItem>
    </Grid>
  );
}
