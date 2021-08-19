import useInterval from '../../hooks/useInterval';
import { useFetchRateOfEthJpy, useFetchYamatoState } from './hooks';

export default function Updater(): null {
  const fetchYamatoState = useFetchYamatoState();
  const fetchRateOfEthJpy = useFetchRateOfEthJpy();

  useInterval(() => {
    // TODO: replace me.
    const mockState = {
      totalCollateral: 4 + Math.random(),
      totalDebt: 1200000 + Math.random() * 100000,
      redemptionReserve: 10,
      sweepReserve: 2,
      sweepableCandiate: 0.5,
    };
    fetchYamatoState(
      mockState.totalCollateral,
      mockState.totalDebt,
      ((mockState.totalCollateral * 300000) / mockState.totalDebt) * 100,
      mockState.redemptionReserve,
      mockState.sweepReserve,
      mockState.sweepableCandiate
    );
  }, 5000);

  useInterval(() => {
    // TODO: replace me.
    const mockState = 300000 + Math.random() * 1000;
    fetchRateOfEthJpy(mockState);
  }, 5000);

  return null;
}
