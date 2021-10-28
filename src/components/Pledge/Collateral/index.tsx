import { Grid, GridItem, Skeleton } from '@chakra-ui/react';
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
  const { collateral, debt, withdrawalLockDate } = usePledgeData();

  return (
    <Grid templateColumns="repeat(8, 1fr)" gap={4} mb={4}>
      <GridItem colSpan={1}>
        <ItemTitleForPledge marginTop={26}>担保量</ItemTitleForPledge>
      </GridItem>

      <GridItem colSpan={1}>
        <ItemTitleValue
          marginTop={26}
          data-testid="collateral-data-currentAmount"
        >
          {firstLoadCompleted ? (
            <>
              {formatPrice(collateral, 'eth').value}
              {YAMATO_SYMBOL.COLLATERAL}
            </>
          ) : (
            <Skeleton height="1.6rem" width="7rem" />
          )}
        </ItemTitleValue>
      </GridItem>

      <GridItem colSpan={3}>
        <DepositInput
          collateral={collateral}
          debt={debt}
          rateOfEthJpy={rateOfEthJpy}
        />
      </GridItem>

      <GridItem colSpan={3}>
        <WithdrawalInput
          collateral={collateral}
          debt={debt}
          rateOfEthJpy={rateOfEthJpy}
          withdrawalLockDate={withdrawalLockDate}
        />
      </GridItem>

      <GridItem colSpan={1}>
        <ItemTitleForPledge marginTop={26}>評価額</ItemTitleForPledge>
      </GridItem>
      <GridItem colSpan={1}>
        <ItemTitleValue marginTop={26}>
          {firstLoadCompleted ? (
            <>
              ¥
              {
                formatPrice(multiplyToNum(collateral, rateOfEthJpy), 'jpy')
                  .value
              }
            </>
          ) : (
            <Skeleton height="1.6rem" width="7rem" />
          )}
        </ItemTitleValue>
      </GridItem>
    </Grid>
  );
}
