import { Grid, GridItem } from '@chakra-ui/react';
import { YAMATO_SYMBOL } from '../../../constants/yamato';
import { useActiveWeb3React } from '../../../hooks/web3';
import { usePledgeData } from '../../../state/pledge/hooks';
import { useYamatoStateForPledge } from '../../../state/yamato-entirety/hooks';
import { multiplyToNum } from '../../../utils/bignumber';
import { formatPrice } from '../../../utils/prices';
import { ItemTitleForPledge, ItemTitleValue } from '../../CommonItem';
import DepositInput from './DepositInput';
import WithdrawalInput from './WithdrawalInput';

export default function Collateral() {
  const { account, library } = useActiveWeb3React();

  const { rateOfEthJpy } = useYamatoStateForPledge();
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
          {collateral}
          {YAMATO_SYMBOL.COLLATERAL}
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
          ¥{formatPrice(multiplyToNum(collateral, rateOfEthJpy), 'jpy').value}
        </ItemTitleValue>
      </GridItem>
    </Grid>
  );
}
