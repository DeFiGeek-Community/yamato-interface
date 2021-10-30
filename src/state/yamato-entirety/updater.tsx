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
} from './actions';
import { initialState } from './reducer';

const isUseMock = process.env.REACT_APP_USE_MOCK
  ? JSON.parse(process.env.REACT_APP_USE_MOCK)
  : false;

const initialYamatoParams = initialState;
const initialTokenParams = initialState.token;

export default function Updater(): null {
  const { active, account, chainId } = useActiveWeb3React();

  const dispatch = useAppDispatch();
  const yamatoMainContract = useYamatoMainContract();
  const yamatoPoolContract = useYamatoPoolContract();
  const yamatoPriceFeedContract = useYamatoPriceFeedContract();
  const yamatoPriorityRegistryContract = useYamatoPriorityRegistryContract();
  const cjpyContract = useCjpyContract();
  const ymtContract = useYmtContract();
  const veYmtContract = useVeYmtContract();

  const blockNumber = useBlockNumber();

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

  const polling = useCallback(async () => {
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

    dispatch(fetchYamatoState(yamatoParams));
    dispatch(fetchRateOfEthJpy({ rateOfEthJpy }));
    dispatch(fetchTokenState(tokenParams));
    dispatch(fetchEvents({ events: eventParams }));
  }, [fetch, dispatch]);

  useInterval(polling, 5000, true);

  return null;
}
