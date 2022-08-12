import { Box } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
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
  isDecreaseForRedemptionReserve: boolean;
  reserveRankOfSweep: number;
  isDecreaseForSweepReserve: boolean;
}

function renderBattery(reserveRank: number, isDecrease: boolean) {
  const svgProps = { viewBox: '10 -3 40 40' };
  const svgProps2 = { height: '4rem', viewBox: '22 0 50 50' };
  switch (reserveRank) {
    case 1:
      return !isDecrease ? (
        <Battery1Charge {...svgProps} />
      ) : (
        <Battery1Discharge {...svgProps2} />
      );
    case 2:
      return !isDecrease ? (
        <Battery2Charge {...svgProps} />
      ) : (
        <Battery2Discharge {...svgProps2} />
      );
    case 3:
      return !isDecrease ? (
        <Battery3Charge {...svgProps} />
      ) : (
        <Battery3Discharge {...svgProps2} />
      );
    case 4:
      return !isDecrease ? (
        <Battery4Charge {...svgProps} />
      ) : (
        <Battery4Discharge {...svgProps2} />
      );
    case 5:
      return !isDecrease ? (
        <Battery5Charge {...svgProps} />
      ) : (
        <Battery5Discharge {...svgProps2} />
      );
    case 6:
      return !isDecrease ? (
        <Battery6Charge {...svgProps} />
      ) : (
        <Battery6Discharge {...svgProps2} />
      );
    case 7:
      return !isDecrease ? (
        <Battery7Charge {...svgProps} />
      ) : (
        <Battery7Discharge {...svgProps2} />
      );
    case 8:
      return !isDecrease ? (
        <Battery8Charge {...svgProps} />
      ) : (
        <Battery8Discharge {...svgProps2} />
      );
    case 9:
      return !isDecrease ? (
        <Battery9Charge {...svgProps} />
      ) : (
        <Battery9Discharge {...svgProps2} />
      );
    case 10:
      return !isDecrease ? (
        <Battery10Charge {...svgProps} />
      ) : (
        <Battery10Discharge {...svgProps2} />
      );
    default:
      return <Battery1Discharge {...svgProps} />;
  }
}

export default function Pool(props: Props) {
  const { t } = useTranslation();
  const {
    reserveRankOfRedemption,
    isDecreaseForRedemptionReserve,
    reserveRankOfSweep,
    isDecreaseForSweepReserve,
  } = props;

  return (
    <Box border="2px solid #5bad92">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        p={1}
      >
        <ItemTitleForInfographics>
          {t('infographics.redemptionPool')}
        </ItemTitleForInfographics>
      </Box>
      <BatteryContainer>
        <BatterySvgWrapper>
          {renderBattery(
            reserveRankOfRedemption,
            isDecreaseForRedemptionReserve
          )}
        </BatterySvgWrapper>
      </BatteryContainer>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        p={1}
      >
        <ItemTitleForInfographics>
          {t('infographics.liquidationPool')}
        </ItemTitleForInfographics>
      </Box>
      <BatteryContainer>
        <BatterySvgWrapper>
          {renderBattery(reserveRankOfSweep, isDecreaseForSweepReserve)}
        </BatterySvgWrapper>
      </BatteryContainer>
    </Box>
  );
}
