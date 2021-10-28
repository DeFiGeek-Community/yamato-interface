import { useCallback } from 'react';
import { isEnableSubgraph } from '../../constants/api';
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
  fetchRedeemablPledges,
  fetchTotalSupply,
  fetchYamatoEntiretyStateFromContract,
} from '../../utils/fetchState';
import { fetchEventLogs } from '../../utils/fetchState/fetchEventLogs';
import { fetchSubgraph, getCache } from '../../utils/fetchState/fetchSubgraph';
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
} from './hooks';
import { initialState } from './reducer';

const isUseMock = process.env.REACT_APP_USE_MOCK
  ? JSON.parse(process.env.REACT_APP_USE_MOCK)
  : false;

const initialYamatoParams = initialState;
const initialTokenParams = initialState.token;

export default function Updater(): null {
  const { active, account, chainId } = useActiveWeb3React();

  const yamatoMainContract = useYamatoMainContract();
  const yamatoPoolContract = useYamatoPoolContract();
  const yamatoPriceFeedContract = useYamatoPriceFeedContract();
  const yamatoPriorityRegistryContract = useYamatoPriorityRegistryContract();
  const cjpyContract = useCjpyContract();
  const ymtContract = useYmtContract();
  const veYmtContract = useVeYmtContract();

  const dispatchFetchYamatoState = useFetchYamatoState();
  const dispatchFetchTokenState = useFetchTokenState();
  const dispatchFetchRateOfEthJpy = useFetchRateOfEthJpy();
  const dispatchFetchEvents = useFetchEvents();
  const blockNumber = useBlockNumber();

  useInterval(
    async () => {
      let yamatoParams;
      let rateOfEthJpy: number;
      let tokenParams;
      let eventParams;
      if (!isUseMock) {
        const res = await fetch();
        yamatoParams = res.yamatoParams;
        rateOfEthJpy = res.rateOfEthJpy;
        tokenParams = res.tokenParams;
        eventParams = res.eventParams;
      } else {
        yamatoParams = mockYamatoEntirety.yamatoParams;
        rateOfEthJpy = mockYamatoEntirety.rateOfEthJpy;
        tokenParams = mockTokenTotalSupply;
        eventParams = mockLogs();
      }

      dispatchFetchYamatoState(yamatoParams);
      dispatchFetchRateOfEthJpy(rateOfEthJpy);
      dispatchFetchTokenState(tokenParams);
      dispatchFetchEvents(eventParams);
    },
    5000,
    true
  );

  const fetch = useCallback(async () => {
    // from Subgraph
    if (isEnableSubgraph) {
      try {
        const res = await fetchSubgraph(chainId, account, active);
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
        // do nothing
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
          ymtContract,
          veYmtContract,
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
    chainId,
    blockNumber,
    cjpyContract,
    veYmtContract,
    yamatoMainContract,
    yamatoPoolContract,
    yamatoPriceFeedContract,
    yamatoPriorityRegistryContract,
    ymtContract,
  ]);

  return null;
}
