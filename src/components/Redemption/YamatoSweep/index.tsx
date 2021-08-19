import { Grid, HStack } from '@chakra-ui/react';
import { useActiveWeb3React } from '../../../hooks/web3';
import { useYamatoStateForPledge } from '../../../state/yamato-entirety/hooks';
import { ItemTitle } from '../../CommonItem';
import SweepInput from './SweepInput';

export default function YamatoSubrogation() {
  const { account, library } = useActiveWeb3React();

  const yamato = useYamatoStateForPledge();

  return (
    <HStack spacing="24px" align="start">
      <ItemTitle>Yamato代位弁済</ItemTitle>

      <SweepInput
        totalCollateral={yamato.totalCollateral}
        totalDebt={yamato.totalDebt}
        tcr={yamato.tcr}
        rateOfEthJpy={yamato.rateOfEthJpy}
        redemptionReserve={yamato.redemptionReserve}
        sweepReserve={yamato.sweepReserve}
        sweepableCandiate={yamato.sweepableCandiate}
      />
    </HStack>
  );
}
