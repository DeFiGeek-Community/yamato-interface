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
  mockLogs,
  mockTokenTotalSupply,
  mockYamatoEntirety,
} from '../mockData';
import {
  useFetchEvents,
  useFetchRateOfEthJpy,
  useFetchTokenState,
  useFetchYamatoState,
} from './hooks';

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
    if (!isUseMock) {
      yamatoParams = await fetchYamatoEntiretyStateFromContract({
        yamatoMainContract,
        yamatoPoolContract,
        yamatoPriceFeedContract,
      });
      rateOfEthJpy = yamatoParams.rateOfEthJpy;
    } else {
      yamatoParams = mockYamatoEntirety.yamatoParams;
      rateOfEthJpy = mockYamatoEntirety.rateOfEthJpy;
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
    if (!isUseMock) {
      tokenParams = await fetchTotalSupply({
        cjpyContract,
        ymtContract,
        veYmtContract,
      });
    } else {
      tokenParams = mockTokenTotalSupply;
    }
    fetchTokenState(tokenParams);
  }, 5000);

  useInterval(() => {
    // TODO: replace me.
    const now = Date.now();
    const mockState = mockLogs(now);
    fetchEvents(mockState);
  }, 5000);

  return null;
}
