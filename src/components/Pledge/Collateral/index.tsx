import { HStack } from '@chakra-ui/react';
import { useActiveWeb3React } from '../../../hooks/web3';
import { usePledgeData } from '../../../state/pledge/hooks';
import { Label, CurrentValue } from '../common';
import CollateralInput from './CollateralInput';
import WithdrawalInput from './WithdrawalInput';

export default function Collateral() {
  const { account, library } = useActiveWeb3React();
  const pledge = usePledgeData();

  return (
    <HStack spacing="24px" align="start">
      <Label>担保数</Label>
      <div>
        <CurrentValue>{pledge.collateral}</CurrentValue>
      </div>

      <CollateralInput collateral={pledge.collateral} />

      <WithdrawalInput
        collateral={pledge.collateral}
        withdrawalLockDate={pledge.withdrawalLockDate}
      />
    </HStack>
  );
}
