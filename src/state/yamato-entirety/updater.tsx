import {
  useCjpyContract,
  useVeYmtContract,
  useYamatoMainContract,
  useYamatoPoolContract,
  useYamatoPriceFeedContract,
  useYmtContract,
} from '../../hooks/useContract';
import useInterval from '../../hooks/useInterval';
import { useActiveWeb3React } from '../../hooks/web3';
import {
  fetchTotalSupply,
  fetchYamatoEntiretyStateFromContract,
} from '../../utils/fetchState';
import {
  useFetchEvents,
  useFetchRateOfEthJpy,
  useFetchTokenState,
  useFetchYamatoState,
} from './hooks';
import { LogEventType } from './reducer';

const isUseMock = process.env.REACT_APP_USE_MOCK
  ? JSON.parse(process.env.REACT_APP_USE_MOCK)
  : false;

export default function Updater(): null {
  const { active, account } = useActiveWeb3React();

  const yamatoMainContract = useYamatoMainContract();
  const yamatoPoolContract = useYamatoPoolContract();
  const yamatoPriceFeedContract = useYamatoPriceFeedContract();
  const cjpyContract = useCjpyContract();
  const ymtContract = useYmtContract();
  const veYmtContract = useVeYmtContract();

  const fetchYamatoState = useFetchYamatoState();
  const fetchTokenState = useFetchTokenState();
  const fetchRateOfEthJpy = useFetchRateOfEthJpy();
  const fetchEvents = useFetchEvents();

  useInterval(async () => {
    // TODO: If implementing subgraph, remove. You will execute this alltime without wallet.
    if (!active || !account) {
      return;
    }

    let yamatoParams;
    let rateOfEthJpy: number;
    if (isUseMock) {
      const mockState = {
        totalCollateral: 2.5 + Math.random() * 10,
        totalDebt: 1200000 + Math.random() * 100000,
        redemptionReserve: Math.random() * 100000000,
        sweepReserve: Math.random() * 10000000,
        sweepableCandiate: Math.random() * 1000,
        rateOfEthJpy: 300000 + Math.random() * 1000,
        MCR: 110,
        RRR: 80,
        SRR: 20,
        GRR: 1,
      };
      yamatoParams = {
        lending: {
          totalCollateral: mockState.totalCollateral, // totalColl in Yamato.sol
          totalDebt: mockState.totalDebt, // totalDebt in Yamato.sol
          tcr:
            mockState.totalDebt > 0
              ? ((mockState.totalCollateral * mockState.rateOfEthJpy) /
                  mockState.totalDebt) *
                100
              : 0,
          tvl: mockState.totalCollateral + 1, // lockedCollateral in Pool.sol
        },
        pool: {
          redemptionReserve: mockState.redemptionReserve, // redemptionReserve in Pool.sol
          sweepReserve: mockState.sweepReserve, // sweepReserve in Pool.sol
          sweepableCandiate: mockState.sweepableCandiate, // FIXME: ISSUE #27
        },
        parameter: {
          MCR: 110,
          RRR: 80,
          SRR: 20,
          GRR: 1,
        },
      };
      rateOfEthJpy = mockState.rateOfEthJpy;
    } else {
      yamatoParams = await fetchYamatoEntiretyStateFromContract({
        yamatoMainContract,
        yamatoPoolContract,
        yamatoPriceFeedContract,
      });
      rateOfEthJpy = yamatoParams.rateOfEthJpy;
    }

    fetchYamatoState(yamatoParams);
    fetchRateOfEthJpy(rateOfEthJpy);
  }, 5000);

  useInterval(async () => {
    // TODO: If implementing subgraph, remove. You will execute this alltime without wallet.
    if (!active || !account) {
      return;
    }

    let tokenParams;
    if (isUseMock) {
      tokenParams = {
        cjpy: { totalSupply: 1000 },
        ymt: { totalSupply: 100 },
        veYmt: { totalSupply: 10, boostRate: 1.5 },
      };
    } else {
      tokenParams = await fetchTotalSupply({
        cjpyContract,
        ymtContract,
        veYmtContract,
      });
    }
    fetchTokenState(tokenParams);
  }, 5000);

  useInterval(() => {
    // TODO: replace me.
    const now = Date.now();
    const mockState = [
      {
        id: '1',
        date: 10,
        address: mockAddress(),
        category: 'governance_withdrawal' as LogEventType,
        value: '10',
      },
      {
        id: '2',
        date: 11,
        address: mockAddress(),
        category: 'yamato_redemption' as LogEventType,
        value: '5',
      },
      {
        id: `${Math.floor(Math.random() * 100)}`,
        date: now + 1,
        address: mockAddress(),
        category: 'borrowing' as LogEventType,
        value: `${Math.floor(Math.random() * 1000)}`,
      },
      {
        id: `${Math.floor(Math.random() * 100)}`,
        date: now + 2,
        address: mockAddress(),
        category: 'repay' as LogEventType,
        value: `${Math.floor(Math.random() * 100)}`,
      },
      {
        id: `${Math.floor(Math.random() * 100)}`,
        date: now + 3,
        address: mockAddress(),
        category: 'withdrawal' as LogEventType,
        value: `${Math.floor(Math.random() * 10)}`,
      },
      {
        id: `${Math.floor(Math.random() * 100)}`,
        date: now + 4,
        address: mockAddress(),
        category: 'deposit' as LogEventType,
        value: `${Math.floor(Math.random() * 10)}`,
      },
    ];
    fetchEvents(mockState);
  }, 5000);

  return null;
}

function mockAddress() {
  const S = 'abcdef0123456789';
  const N = 40;
  return [...Array(N)]
    .map(() => S[Math.floor(Math.random() * S.length)])
    .join('');
}
