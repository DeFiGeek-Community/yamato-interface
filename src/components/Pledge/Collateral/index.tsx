import { HStack } from '@chakra-ui/react';
import { YAMATO_SYMBOL } from '../../../constants/yamato';
import { useActiveWeb3React } from '../../../hooks/web3';
import { useMarketDataForPledge } from '../../../state/market/hooks';
import { usePledgeData } from '../../../state/pledge/hooks';
import { multiplyToNum } from '../../../utils/bignumber';
import { Label, CurrentValue } from '../common';
import DepositInput from './DepositInput';
import WithdrawalInput from './WithdrawalInput';

export default function Collateral() {
  const { account, library } = useActiveWeb3React();

  const market = useMarketDataForPledge();
  const pledge = usePledgeData();

  return (
    <>
      <HStack spacing="24px" align="start">
        <Label>担保数</Label>
        <div>
          <CurrentValue>
            {pledge.collateral}
            {YAMATO_SYMBOL.COLLATERAL}
          </CurrentValue>
        </div>

        <DepositInput collateral={pledge.collateral} debt={pledge.debt} />

        <WithdrawalInput
          collateral={pledge.collateral}
          debt={pledge.debt}
          withdrawalLockDate={pledge.withdrawalLockDate}
        />
      </HStack>

      <HStack spacing="24px" align="start">
        <Label>評価額</Label>
        <div>
          <CurrentValue>
            ¥{multiplyToNum(pledge.collateral, market.rate)}
          </CurrentValue>
        </div>
      </HStack>
    </>
  );
}
