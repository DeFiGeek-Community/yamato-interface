import { HStack } from '@chakra-ui/react';
import { YAMATO_SYMBOL } from '../../../constants/yamato';
import { useActiveWeb3React } from '../../../hooks/web3';
import { usePledgeData } from '../../../state/pledge/hooks';
import { useYamatoStateForPledge } from '../../../state/yamato-entirety/hooks';
import { multiplyToNum } from '../../../utils/bignumber';
import { ItemTitle, CurrentValue } from '../../CommonItem';
import DepositInput from './DepositInput';
import WithdrawalInput from './WithdrawalInput';

export default function Collateral() {
  const { account, library } = useActiveWeb3React();

  const yamato = useYamatoStateForPledge();
  const pledge = usePledgeData();

  return (
    <>
      <HStack spacing="24px" align="start">
        <ItemTitle marginTop={32}>担保数</ItemTitle>
        <div>
          <CurrentValue marginTop={32}>
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
        <ItemTitle marginTop={32}>評価額</ItemTitle>
        <div>
          <CurrentValue marginTop={32}>
            ¥{multiplyToNum(pledge.collateral, yamato.rateOfEthJpy)}
          </CurrentValue>
        </div>
      </HStack>
    </>
  );
}
