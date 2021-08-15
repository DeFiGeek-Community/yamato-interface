import { HStack } from '@chakra-ui/react';
import { YAMATO_SYMBOL } from '../../../constants/yamato';
import { useActiveWeb3React } from '../../../hooks/web3';
import { usePledgeData } from '../../../state/pledge/hooks';
import { formatCollateralizationRatio } from '../../../utils/prices';
import { Label, CurrentValue } from '../common';
import BorrowInput from './BorrowingInput';
import RepayInput from './RepayInput';

export default function Debt() {
  const { account, library } = useActiveWeb3React();

  const pledge = usePledgeData();

  return (
    <>
      <HStack spacing="24px" align="start">
        <Label>借入量</Label>
        <div>
          <CurrentValue>
            {pledge.debt}
            {YAMATO_SYMBOL.YEN}
          </CurrentValue>
        </div>

        <BorrowInput collateral={pledge.collateral} debt={pledge.debt} />

        <RepayInput collateral={pledge.collateral} debt={pledge.debt} />
      </HStack>

      <HStack spacing="24px" align="start">
        <Label>担保率</Label>
        <div>
          <CurrentValue>
            {formatCollateralizationRatio(pledge.collateral, pledge.debt)}%
          </CurrentValue>
        </div>
      </HStack>
    </>
  );
}
