import {
  useCjpyContract,
  useVeYmtContract,
  useYamatoMainContract,
  useYamatoPoolContract,
  useYamatoPriceFeedContract,
  useYamatoPriorityRegistryContract,
  useYmtContract,
} from '../../hooks/useContract';
import useInterval from '../../hooks/useInterval';
import { useActiveWeb3React } from '../../hooks/web3';
import {
  fetchTotalSupply,
  fetchYamatoEntiretyStateFromContract,
} from '../../utils/fetchState';
import { fetchEventLogs } from '../../utils/fetchState/fetchEventLogs';
import { useBlockNumber } from '../application/hooks';
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
  useResetEvents,
} from './hooks';
import { initialState } from './reducer';

const isUseMock = process.env.REACT_APP_USE_MOCK
  ? JSON.parse(process.env.REACT_APP_USE_MOCK)
  : false;

const initialYamatoParams = initialState;
const initialTokenParams = initialState.token;

export default function Updater(): null {
  const { active, account } = useActiveWeb3React();

  const yamatoMainContract = useYamatoMainContract();
  const yamatoPoolContract = useYamatoPoolContract();
  const yamatoPriceFeedContract = useYamatoPriceFeedContract();
  const yamatoPriorityRegistryContract = useYamatoPriorityRegistryContract();
  const cjpyContract = useCjpyContract();
  const ymtContract = useYmtContract();
  const veYmtContract = useVeYmtContract();

  const fetchYamatoState = useFetchYamatoState();
  const fetchTokenState = useFetchTokenState();
  const fetchRateOfEthJpy = useFetchRateOfEthJpy();
  const fetchEvents = useFetchEvents();
  const resetEvents = useResetEvents();
  const blockNumber = useBlockNumber();

  useInterval(async () => {
    // TODO: If implementing subgraph, remove. You will execute this alltime without wallet.
    if (!active || !account) {
      fetchYamatoState(initialYamatoParams);
      fetchRateOfEthJpy(initialYamatoParams.rateOfEthJpy);
      fetchTokenState(initialTokenParams);
      return;
    }

    let yamatoParams;
    let rateOfEthJpy: number;
    let tokenParams;
    if (!isUseMock) {
      try {
        yamatoParams = await fetchYamatoEntiretyStateFromContract({
          yamatoMainContract,
          yamatoPoolContract,
          yamatoPriceFeedContract,
          yamatoPriorityRegistryContract,
        });
        rateOfEthJpy = yamatoParams.rateOfEthJpy;
        tokenParams = await fetchTotalSupply({
          cjpyContract,
          ymtContract,
          veYmtContract,
        });
      } catch (error) {
        console.error(error);
        yamatoParams = initialYamatoParams;
        rateOfEthJpy = initialYamatoParams.rateOfEthJpy;
        tokenParams = initialTokenParams;
      }
    } else {
      yamatoParams = mockYamatoEntirety.yamatoParams;
      rateOfEthJpy = mockYamatoEntirety.rateOfEthJpy;
      tokenParams = mockTokenTotalSupply;
    }

    fetchYamatoState(yamatoParams);
    fetchRateOfEthJpy(rateOfEthJpy);
    fetchTokenState(tokenParams);
  }, 5000);

  useInterval(async () => {
    let params;
    if (!isUseMock) {
      if (!blockNumber || !yamatoMainContract) {
        resetEvents();
        return;
      }
      params = await fetchEventLogs(blockNumber, yamatoMainContract);
    } else {
      params = mockLogs();
    }

    fetchEvents(params);
  }, 5000);

  return null;
}
