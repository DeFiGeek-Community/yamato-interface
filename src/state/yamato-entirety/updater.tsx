import { useCallback, useEffect } from 'react';
import { isEnableSubgraph } from '../../constants/api';
import { useCurrency } from '../../context/CurrencyContext';
import {
  useCjpyContract,
  // useVeYmtContract,
  useYamatoMainContract,
  useYamatoPoolContract,
  useYamatoPriceFeedContract,
  useYamatoPriorityRegistryContract,
  // useYmtContract,
} from '../../hooks/useContract';
import useInterval from '../../hooks/useInterval';
import { useActiveWeb3React } from '../../hooks/web3';
import {
  fetchRedeemablPledges,
  fetchTotalSupply,
  fetchYamatoEntiretyStateFromContract,
} from '../../utils/fetchState';
import { fetchEventLogs } from '../../utils/fetchState/fetchEventLogs';
import { fetchSubgraph } from '../../utils/fetchState/fetchSubgraph';
import { useBlockNumber } from '../application/hooks';
import { useAppDispatch } from '../hooks';
import {
  mockLogs,
  mockTokenTotalSupply,
  mockYamatoEntirety,
} from '../mockData';
import {
  fetchEvents,
  fetchRateOfEthJpy,
  fetchTokenState,
  fetchYamatoState,
  reset,
} from './actions';
import { initialState } from './reducer';

const isUseMock = process.env.REACT_APP_USE_MOCK
  ? JSON.parse(process.env.REACT_APP_USE_MOCK)
  : false;

const initialYamatoParams = initialState;
const initialTokenParams = initialState.token;

export default function Updater(): null {
  const { active, account, chainId } = useActiveWeb3React();
  const { currency } = useCurrency();
  const effectiveChainId = chainId ?? 1;

  const dispatch = useAppDispatch();
  const yamatoMainContract = useYamatoMainContract();
  const yamatoPoolContract = useYamatoPoolContract();
  const yamatoPriceFeedContract = useYamatoPriceFeedContract();
  const yamatoPriorityRegistryContract = useYamatoPriorityRegistryContract();
  const cjpyContract = useCjpyContract();
  // const ymtContract = useYmtContract();
  // const veYmtContract = useVeYmtContract();

  const blockNumber = useBlockNumber();

  const fetch = useCallback(async () => {
    // from Subgraph
    if (isEnableSubgraph) {
      try {
        const res = await fetchSubgraph(effectiveChainId, account, active);
        const res2 = await fetchRedeemablPledges(
          yamatoPriorityRegistryContract
        );
        const yamatoParams = { ...res };
        yamatoParams.pledges.redeemableCandidate = res2.redeemableCandidate;
        yamatoParams.pledges.isRedeemablePledge = res2.isRedeemablePledge;
        return {
          yamatoParams,
          rateOfEthJpy: res.rateOfEthJpy,
          tokenParams: { ...res.token },
          eventParams: res.events,
        };
      } catch (error) {
        console.error(error);
        // Do nothing. Continue to fetching from Ethers.
      }
    }

    // from Ethers
    try {
      const res = await fetchYamatoEntiretyStateFromContract({
        yamatoMainContract,
        yamatoPoolContract,
        yamatoPriceFeedContract,
        yamatoPriorityRegistryContract,
      });
      return {
        yamatoParams: res,
        rateOfEthJpy: res.rateOfEthJpy,
        tokenParams: await fetchTotalSupply({
          cjpyContract,
          ymtContract: null,
          veYmtContract: null,
        }),
        eventParams: await fetchEventLogs(blockNumber, yamatoMainContract),
      };
    } catch (error) {
      console.error(error);
      return {
        yamatoParams: initialYamatoParams,
        rateOfEthJpy: initialYamatoParams.rateOfEthJpy,
        tokenParams: initialTokenParams,
        eventParams: [],
      };
    }
  }, [
    active,
    account,
    effectiveChainId,
    blockNumber,
    cjpyContract,
    // veYmtContract,
    yamatoMainContract,
    yamatoPoolContract,
    yamatoPriceFeedContract,
    yamatoPriorityRegistryContract,
    // ymtContract,
  ]);

  const handleFetchResults = useCallback(
    (res) => {
      const yamatoParams = res.yamatoParams;
      const rateOfEthJpy = res.rateOfEthJpy;
      const tokenParams = res.tokenParams;
      const eventParams = res.eventParams;

      dispatch(fetchYamatoState(yamatoParams));
      dispatch(fetchRateOfEthJpy({ rateOfEthJpy }));
      dispatch(fetchTokenState(tokenParams));
      dispatch(fetchEvents({ events: eventParams }));
    },
    [dispatch]
  );

  const fetchData = useCallback(async () => {
    if (!isUseMock) {
      const res = await fetch();
      handleFetchResults(res);
    } else {
      handleFetchResults({
        yamatoParams: mockYamatoEntirety.yamatoParams,
        rateOfEthJpy: mockYamatoEntirety.rateOfEthJpy,
        tokenParams: mockTokenTotalSupply,
        eventParams: mockLogs(),
      });
    }
  }, [fetch, handleFetchResults]);

  const resetData = useCallback(() => {
    dispatch(reset());
    fetchData();
  }, [dispatch, fetchData]);

  useEffect(() => {
    resetData();
  }, [currency, resetData]);

  useInterval(fetchData, 60000, true);

  // ウォレットが接続されたときにデータを取得
  useEffect(() => {
    if (active && account && chainId) {
      resetData();
    }
  }, [active, account, chainId, resetData]);

  return null;
}
