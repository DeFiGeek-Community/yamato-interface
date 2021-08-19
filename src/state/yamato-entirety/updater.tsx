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
      mockState.totalCollateral, // totalColl in Yamato.sol
      mockState.totalDebt, // totalDebt in Yamato.sol
      mockState.totalCollateral + 1, // lockedCollateral in Pool.sol
      ((mockState.totalCollateral * 300000) / mockState.totalDebt) * 100,
      mockState.redemptionReserve, // redemptionReserve in Pool.sol
      mockState.sweepReserve, // sweepReserve in Pool.sol
      mockState.sweepableCandiate // FIXME
    );
  }, 5000);

  useInterval(() => {
    // TODO: replace me.
    const mockState = 300000 + Math.random() * 1000;
    fetchRateOfEthJpy(mockState);
  }, 5000);

  return null;
}
