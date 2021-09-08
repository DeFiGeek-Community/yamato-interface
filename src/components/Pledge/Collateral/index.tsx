import { Grid, GridItem } from '@chakra-ui/react';
import { YAMATO_SYMBOL } from '../../../constants/yamato';
import { useActiveWeb3React } from '../../../hooks/web3';
import { usePledgeData } from '../../../state/pledge/hooks';
import { useYamatoStateForPledge } from '../../../state/yamato-entirety/hooks';
import { multiplyToNum } from '../../../utils/bignumber';
import { formatPrice } from '../../../utils/prices';
import { ItemTitle, CurrentValue } from '../../CommonItem';
import DepositInput from './DepositInput';
import WithdrawalInput from './WithdrawalInput';

export default function Collateral() {
  const { account, library } = useActiveWeb3React();

  const yamato = useYamatoStateForPledge();
  const pledge = usePledgeData();

  return (
    <Grid templateColumns="repeat(6, 1fr)" gap={4} mb={4}>
      <GridItem colSpan={1}>
        <ItemTitle marginTop={32}>担保数</ItemTitle>
      </GridItem>

      <GridItem colSpan={1}>
        <CurrentValue
          marginTop={32}
          data-testid="collateral-data-currentAmount"
        >
          {pledge.collateral}
          {YAMATO_SYMBOL.COLLATERAL}
        </CurrentValue>
      </GridItem>

      <GridItem colSpan={2}>
        <DepositInput collateral={pledge.collateral} debt={pledge.debt} />
      </GridItem>

      <GridItem colSpan={2}>
        <WithdrawalInput
          collateral={pledge.collateral}
          debt={pledge.debt}
          withdrawalLockDate={pledge.withdrawalLockDate}
        />
      </GridItem>

      <GridItem colSpan={1}>
        <ItemTitle marginTop={32}>評価額</ItemTitle>
      </GridItem>
      <GridItem colSpan={1}>
        <CurrentValue marginTop={32}>
          ¥
          {
            formatPrice(
              multiplyToNum(pledge.collateral, yamato.rateOfEthJpy),
              'eth'
            ).value
          }
        </CurrentValue>
      </GridItem>
    </Grid>
  );
}
