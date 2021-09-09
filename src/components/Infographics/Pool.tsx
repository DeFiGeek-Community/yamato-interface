import { Box } from '@chakra-ui/react';
import { ItemTitleForInfographics } from '../CommonItem';
import {
  Battery10Charge,
  Battery10Discharge,
  Battery1Charge,
  Battery1Discharge,
  Battery2Charge,
  Battery2Discharge,
  Battery3Charge,
  Battery3Discharge,
  Battery4Charge,
  Battery4Discharge,
  Battery5Charge,
  Battery5Discharge,
  Battery6Charge,
  Battery6Discharge,
  Battery7Charge,
  Battery7Discharge,
  Battery8Charge,
  Battery8Discharge,
  Battery9Charge,
  Battery9Discharge,
} from '../svgs/battery';
import { getChargeRankOfRedemption, getChargeRankOfSweep } from './functions';

interface Props {
  redemptionReserve: number;
  isIncreaseForRedemptionReserve: boolean;
  sweepReserve: number;
  isIncreaseForSweepReserve: boolean;
}

function renderBattery(chargeRank: number, isIncrease: boolean) {
  switch (chargeRank) {
    case 1:
      return isIncrease ? <Battery1Charge /> : <Battery1Discharge />;
    case 2:
      return isIncrease ? <Battery2Charge /> : <Battery2Discharge />;
    case 3:
      return isIncrease ? <Battery3Charge /> : <Battery3Discharge />;
    case 4:
      return isIncrease ? <Battery4Charge /> : <Battery4Discharge />;
    case 5:
      return isIncrease ? <Battery5Charge /> : <Battery5Discharge />;
    case 6:
      return isIncrease ? <Battery6Charge /> : <Battery6Discharge />;
    case 7:
      return isIncrease ? <Battery7Charge /> : <Battery7Discharge />;
    case 8:
      return isIncrease ? <Battery8Charge /> : <Battery8Discharge />;
    case 9:
      return isIncrease ? <Battery9Charge /> : <Battery9Discharge />;
    case 10:
      return isIncrease ? <Battery10Charge /> : <Battery10Discharge />;
    default:
      return <Battery1Charge />;
  }
}

export default function Pool(props: Props) {
  const {
    redemptionReserve,
    isIncreaseForRedemptionReserve,
    sweepReserve,
    isIncreaseForSweepReserve,
  } = props;

  return (
    <Box border="2px solid #5bad92">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        p={1}
      >
        <ItemTitleForInfographics>償還プール</ItemTitleForInfographics>
      </Box>
      <div>
        {renderBattery(
          getChargeRankOfRedemption(redemptionReserve),
          isIncreaseForRedemptionReserve
        )}
      </div>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        p={1}
      >
        <ItemTitleForInfographics>弁済プール</ItemTitleForInfographics>
      </Box>
      <div>
        {renderBattery(
          getChargeRankOfSweep(sweepReserve),
          isIncreaseForSweepReserve
        )}
      </div>
    </Box>
  );
}
