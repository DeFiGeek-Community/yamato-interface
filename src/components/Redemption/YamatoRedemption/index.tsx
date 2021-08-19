import { HStack } from '@chakra-ui/react';
import { useActiveWeb3React } from '../../../hooks/web3';
import { useYamatoStateForPledge } from '../../../state/yamato-entirety/hooks';
import { ItemTitle } from '../../CommonItem';
import RedemptionInput from './RedemptionInput';

export default function YamatoRedemption() {
  const { account, library } = useActiveWeb3React();

  const yamato = useYamatoStateForPledge();

  return (
    <HStack spacing="24px" align="start">
      <ItemTitle marginTop={32}>Yamato償還</ItemTitle>

      <RedemptionInput
        totalCollateral={yamato.totalCollateral}
        totalDebt={yamato.totalDebt}
        tcr={yamato.tcr}
        rateOfEthJpy={yamato.rateOfEthJpy}
        redemptionReserve={yamato.redemptionReserve}
      />
    </HStack>
  );
}
