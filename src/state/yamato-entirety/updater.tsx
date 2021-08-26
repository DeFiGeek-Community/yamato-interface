import useInterval from '../../hooks/useInterval';
import {
  useFetchEvents,
  useFetchRateOfEthJpy,
  useFetchYamatoState,
} from './hooks';
import { LogEventType } from './reducer';

export default function Updater(): null {
  const fetchYamatoState = useFetchYamatoState();
  const fetchRateOfEthJpy = useFetchRateOfEthJpy();
  const fetchEvents = useFetchEvents();

  useInterval(() => {
    // TODO: replace me.
    const mockState = {
      totalCollateral: 4 + Math.random(),
      totalDebt: 1200000 + Math.random() * 100000,
      redemptionReserve: 10,
      sweepReserve: 2,
      sweepableCandiate: 0.5,
      rateOfEthJpy: 300000 + Math.random() * 1000,
    };
    fetchYamatoState(
      mockState.totalCollateral, // totalColl in Yamato.sol
      mockState.totalDebt, // totalDebt in Yamato.sol
      mockState.totalCollateral + 1, // lockedCollateral in Pool.sol
      ((mockState.totalCollateral * 300000) / mockState.totalDebt) * 100,
      mockState.redemptionReserve, // redemptionReserve in Pool.sol
      mockState.sweepReserve, // sweepReserve in Pool.sol
      mockState.sweepableCandiate // FIXME: ISSUE #27
    );
    fetchRateOfEthJpy(mockState.rateOfEthJpy);
  }, 5000);

  useInterval(() => {
    // TODO: replace me.
    const mockState = [
      {
        id: '1',
        date: 10,
        address: 'aaaaaaaa',
        category: 'deposit' as LogEventType,
        value: '10',
      },
      {
        id: '2',
        date: 11,
        address: '0xteatwo',
        category: 'yamato_redemption' as LogEventType,
        value: '5',
      },
      {
        id: `${Math.floor(Math.random() * 10)}`,
        date: Math.floor(Math.random() * 1000),
        address: `${Math.random().toString(32).substring(2)}`,
        category: 'borrowing' as LogEventType,
        value: `${Math.floor(Math.random() * 10)}`,
      },
      {
        id: `${Math.floor(Math.random() * 10)}`,
        date: Math.floor(Math.random() * 1000),
        address: `${Math.random().toString(32).substring(2)}`,
        category: 'repay' as LogEventType,
        value: `${Math.floor(Math.random() * 10)}`,
      },
      {
        id: `${Math.floor(Math.random() * 100)}`,
        date: Math.floor(Math.random() * 1000),
        address: `${Math.random().toString(32).substring(2)}`,
        category: 'withdrawal' as LogEventType,
        value: `${Math.floor(Math.random() * 10)}`,
      },
    ];
    fetchEvents(mockState);
  }, 5000);

  return null;
}
