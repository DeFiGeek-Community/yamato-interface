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

const initialYamatoParams = {
  lending: {
    totalCollateral: 0,
    totalDebt: 0,
    tcr: 0,
    tvl: 0,
  },
  pool: {
    redemptionReserve: 0,
    sweepReserve: 0,
    sweepableCandiate: 0,
  },
  parameter: {
    MCR: 0,
    RRR: 0,
    SRR: 0,
    GRR: 0,
  },
  rateOfEthJpy: 0,
};
const initialTokenParams = {
  cjpy: {
    totalSupply: 0,
  },
  ymt: {
    totalSupply: 0,
  },
  veYmt: {
    totalSupply: 0,
    boostRate: 0,
  },
};

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

  useInterval(() => {
    // TODO: replace me.
    const now = Date.now();
    const mockState = mockLogs(now);
    fetchEvents(mockState);
  }, 5000);

  return null;
}
