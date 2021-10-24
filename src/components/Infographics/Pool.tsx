import { Box } from '@chakra-ui/react';
import styled from 'styled-components';
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

const BatteryContainer = styled.div`
  margin: auto;
  height: 4.1rem;
  display: table;
`;
const BatterySvgWrapper = styled.div`
  display: table-cell;
  text-align: center;
  vertical-align: middle;
`;

interface Props {
  reserveRankOfRedemption: number;
  isIncreaseForRedemptionReserve: boolean;
  reserveRankOfSweep: number;
  isIncreaseForSweepReserve: boolean;
}

function renderBattery(reserveRank: number, isIncrease: boolean) {
  const svgProps = { viewBox: '10 -3 40 40' };
  const svgProps2 = { height: '4rem', viewBox: '22 0 50 50' };
  switch (reserveRank) {
    case 1:
      return isIncrease ? (
        <Battery1Charge {...svgProps} />
      ) : (
        <Battery1Discharge {...svgProps2} />
      );
    case 2:
      return isIncrease ? (
        <Battery2Charge {...svgProps} />
      ) : (
        <Battery2Discharge {...svgProps2} />
      );
    case 3:
      return isIncrease ? (
        <Battery3Charge {...svgProps} />
      ) : (
        <Battery3Discharge {...svgProps2} />
      );
    case 4:
      return isIncrease ? (
        <Battery4Charge {...svgProps} />
      ) : (
        <Battery4Discharge {...svgProps2} />
      );
    case 5:
      return isIncrease ? (
        <Battery5Charge {...svgProps} />
      ) : (
        <Battery5Discharge {...svgProps2} />
      );
    case 6:
      return isIncrease ? (
        <Battery6Charge {...svgProps} />
      ) : (
        <Battery6Discharge {...svgProps2} />
      );
    case 7:
      return isIncrease ? (
        <Battery7Charge {...svgProps} />
      ) : (
        <Battery7Discharge {...svgProps2} />
      );
    case 8:
      return isIncrease ? (
        <Battery8Charge {...svgProps} />
      ) : (
        <Battery8Discharge {...svgProps2} />
      );
    case 9:
      return isIncrease ? (
        <Battery9Charge {...svgProps} />
      ) : (
        <Battery9Discharge {...svgProps2} />
      );
    case 10:
      return isIncrease ? (
        <Battery10Charge {...svgProps} />
      ) : (
        <Battery10Discharge {...svgProps2} />
      );
    default:
      return <Battery1Discharge {...svgProps} />;
  }
}

export default function Pool(props: Props) {
  const {
    reserveRankOfRedemption,
    isIncreaseForRedemptionReserve,
    reserveRankOfSweep,
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
      <BatteryContainer>
        <BatterySvgWrapper>
          {renderBattery(
            reserveRankOfRedemption,
            isIncreaseForRedemptionReserve
          )}
        </BatterySvgWrapper>
      </BatteryContainer>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        p={1}
      >
        <ItemTitleForInfographics>弁済プール</ItemTitleForInfographics>
      </Box>
      <BatteryContainer>
        <BatterySvgWrapper>
          {renderBattery(reserveRankOfSweep, isIncreaseForSweepReserve)}
        </BatterySvgWrapper>
      </BatteryContainer>
    </Box>
  );
}
