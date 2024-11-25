import { useEffect } from 'react';
import { isEnableSubgraph } from '../../constants/api';
import { useCurrency } from '../../context/CurrencyContext';
import { useYamatoMainContract } from '../../hooks/useContract';
import useInterval from '../../hooks/useInterval';
import { useActiveWeb3React } from '../../hooks/web3';
import { fetchPledgeStateFromContract } from '../../utils/fetchState';
import { getCache } from '../../utils/fetchState/fetchSubgraph';
import { mockPledge } from '../mockData';
import { useFetchMyPledge } from './hooks';

const isUseMock = process.env.REACT_APP_USE_MOCK
  ? JSON.parse(process.env.REACT_APP_USE_MOCK)
  : false;

const initialPledgeParams = {
  '': {
    collateral: 0,
    debt: 0,
  },
};

export default function Updater(): null {
  const { account } = useActiveWeb3React();
  const yamatoMainContract = useYamatoMainContract();
  const { currency } = useCurrency();

  const dispatchFetchMyPledge = useFetchMyPledge();

  const fetchData = async () => {
    let params;
    if (!isUseMock) {
      try {
        params = isEnableSubgraph
          ? getCache().pledge
          : await fetchPledgeStateFromContract(account, {
              yamatoMainContract,
            });
      } catch (error) {
        console.error(error);
        params = { ...initialPledgeParams };
      }
    } else {
      params = mockPledge(account ?? '');
    }

    dispatchFetchMyPledge(params);
  };

  useEffect(() => {
    dispatchFetchMyPledge(initialPledgeParams);
    fetchData();
  }, [currency]);

  useInterval(fetchData, isEnableSubgraph ? 1000 : 10000, true);

  return null;
}