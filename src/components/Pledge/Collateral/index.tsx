import { Grid, GridItem } from '@chakra-ui/react';
import { YAMATO_SYMBOL } from '../../../constants/yamato';
import { useActiveWeb3React } from '../../../hooks/web3';
import { usePledgeData } from '../../../state/pledge/hooks';
import { useYamatoStateForPledge } from '../../../state/yamato-entirety/hooks';
import { multiplyToNum } from '../../../utils/bignumber';
import { formatPrice } from '../../../utils/prices';
import { ItemTitleForPledge, CurrentValue } from '../../CommonItem';
import DepositInput from './DepositInput';
import WithdrawalInput from './WithdrawalInput';

export default function Collateral() {
  const { account, library } = useActiveWeb3React();

  const { rateOfEthJpy } = useYamatoStateForPledge();
  const { collateral, debt, withdrawalLockDate } = usePledgeData();

  return (
    <Grid templateColumns="repeat(6, 1fr)" gap={4} mb={4}>
      <GridItem colSpan={1}>
        <ItemTitleForPledge marginTop={32}>担保数</ItemTitleForPledge>
      </GridItem>

      <GridItem colSpan={1}>
        <CurrentValue marginTop={32}>
          {collateral}
          {YAMATO_SYMBOL.COLLATERAL}
        </CurrentValue>
      </GridItem>

      <GridItem colSpan={2}>
        <DepositInput collateral={collateral} debt={debt} />
      </GridItem>

      <GridItem colSpan={2}>
        <WithdrawalInput
          collateral={collateral}
          debt={debt}
          withdrawalLockDate={withdrawalLockDate}
        />
      </GridItem>

      <GridItem colSpan={1}>
        <ItemTitleForPledge marginTop={32}>評価額</ItemTitleForPledge>
      </GridItem>
      <GridItem colSpan={1}>
        <CurrentValue marginTop={32}>
          ¥{formatPrice(multiplyToNum(collateral, rateOfEthJpy), 'eth').value}
        </CurrentValue>
      </GridItem>
    </Grid>
  );
}
