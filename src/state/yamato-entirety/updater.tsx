import useInterval from '../../hooks/useInterval';
import {
  useFetchEvents,
  useFetchRateOfEthJpy,
  useFetchTokenState,
  useFetchYamatoState,
} from './hooks';
import { LogEventType } from './reducer';

export default function Updater(): null {
  const fetchYamatoState = useFetchYamatoState();
  const fetchTokenState = useFetchTokenState();
  const fetchRateOfEthJpy = useFetchRateOfEthJpy();
  const fetchEvents = useFetchEvents();

  useInterval(() => {
    // TODO: replace me.
    const mockState = {
      totalCollateral: 2.5 + Math.random() * 10,
      totalDebt: 1200000 + Math.random() * 100000,
      redemptionReserve: Math.random() * 100000000,
      sweepReserve: Math.random() * 10000000,
      sweepableCandiate: Math.random() * 1000,
      rateOfEthJpy: 300000 + Math.random() * 1000,
    };
    fetchYamatoState(
      mockState.totalCollateral, // totalColl in Yamato.sol
      mockState.totalDebt, // totalDebt in Yamato.sol
      mockState.totalCollateral + 1, // lockedCollateral in Pool.sol
      ((mockState.totalCollateral * mockState.rateOfEthJpy) /
        mockState.totalDebt) *
        100,
      mockState.redemptionReserve, // redemptionReserve in Pool.sol
      mockState.sweepReserve, // sweepReserve in Pool.sol
      mockState.sweepableCandiate // FIXME: ISSUE #27
    );
    fetchRateOfEthJpy(mockState.rateOfEthJpy);
  }, 5000);

  useInterval(() => {
    // TODO: replace me.
    const mockState = {
      cjpy: { totalSupply: 1000 },
      ymt: { totalSupply: 100 },
      veYmt: { totalSupply: 10, boostRate: 1.5 },
    };
    fetchTokenState(mockState);
  }, 5000);

  useInterval(() => {
    // TODO: replace me.
    const now = Date.now();
    const mockState = [
      {
        id: '1',
        date: 10,
        address: 'aaaaaaaa',
        category: 'governance_withdrawal' as LogEventType,
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
        id: `${Math.floor(Math.random() * 100)}`,
        date: now + 1,
        address: `${Math.random().toString(32).substring(2)}`,
        category: 'borrowing' as LogEventType,
        value: `${Math.floor(Math.random() * 1000)}`,
      },
      {
        id: `${Math.floor(Math.random() * 100)}`,
        date: now + 2,
        address: `${Math.random().toString(32).substring(2)}`,
        category: 'repay' as LogEventType,
        value: `${Math.floor(Math.random() * 100)}`,
      },
      {
        id: `${Math.floor(Math.random() * 100)}`,
        date: now + 3,
        address: `${Math.random().toString(32).substring(2)}`,
        category: 'withdrawal' as LogEventType,
        value: `${Math.floor(Math.random() * 10)}`,
      },
      {
        id: `${Math.floor(Math.random() * 100)}`,
        date: now + 4,
        address: `${Math.random().toString(32).substring(2)}`,
        category: 'deposit' as LogEventType,
        value: `${Math.floor(Math.random() * 10)}`,
      },
    ];
    fetchEvents(mockState);
  }, 5000);

  return null;
}
