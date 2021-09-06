import { Grid, GridItem } from '@chakra-ui/react';
import { YAMATO_SYMBOL } from '../../../constants/yamato';
import { useActiveWeb3React } from '../../../hooks/web3';
import { usePledgeData } from '../../../state/pledge/hooks';
import { formatCollateralizationRatio } from '../../../utils/prices';
import { CurrentValue, ItemTitle } from '../../CommonItem';
import BorrowInput from './BorrowingInput';
import RepayInput from './RepayInput';

export default function Debt() {
  const { account, library } = useActiveWeb3React();

  const pledge = usePledgeData();

  return (
    <Grid templateColumns="repeat(6, 1fr)" gap={4} mb={4}>
      <GridItem colSpan={1}>
        <ItemTitle marginTop={32}>借入量</ItemTitle>
      </GridItem>

      <GridItem colSpan={1}>
        <CurrentValue marginTop={32} data-e2e="borrowing-data-currentamount">
          {pledge.debt}
          {YAMATO_SYMBOL.YEN}
        </CurrentValue>
      </GridItem>

      <GridItem colSpan={2}>
        <BorrowInput collateral={pledge.collateral} debt={pledge.debt} />
      </GridItem>

      <GridItem colSpan={2}>
        <RepayInput collateral={pledge.collateral} debt={pledge.debt} />
      </GridItem>

      <GridItem colSpan={1}>
        <ItemTitle marginTop={32}>担保率</ItemTitle>
      </GridItem>
      <GridItem colSpan={1}>
        <CurrentValue marginTop={32}>
          {formatCollateralizationRatio(pledge.collateral, pledge.debt)}%
        </CurrentValue>
      </GridItem>
    </Grid>
  );
}
