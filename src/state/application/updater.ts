import ms from 'ms.macro';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CHAIN_INFO } from '../../constants/chains';
import useDebounce from '../../hooks/useDebounce';
import useIsWindowVisible from '../../hooks/useIsWindowVisible';
import { useActiveWeb3React } from '../../hooks/web3';
import { resetCache } from '../../utils/fetchState/fetchSubgraph';
import { supportedChainId } from '../../utils/supportedChainId';
import { switchToNetwork } from '../../utils/switchToNetwork';
import { useAppDispatch, useAppSelector } from '../hooks';
import { reset as resetOfPledge } from '../pledge/actions';
import { reset as resetOfYamato } from '../yamato-entirety/actions';

import {
  setChainConnectivityWarning,
  setImplements3085,
  updateBlockNumber,
  updateChainId,
} from './actions';
import { useBlockNumber } from './hooks';

const NETWORK_HEALTH_CHECK_MS = ms`15s`;
const DEFAULT_MS_BEFORE_WARNING = ms`10m`;

function useBlockWarningTimer() {
  const { chainId } = useActiveWeb3React();
  const dispatch = useAppDispatch();
  const chainConnectivityWarningActive = useAppSelector(
    (state) => state.application.chainConnectivityWarning
  );
  const timeout = useRef<NodeJS.Timeout>();
  const isWindowVisible = useIsWindowVisible();
  const [msSinceLastBlock, setMsSinceLastBlock] = useState(0);
  const currentBlock = useBlockNumber();

  useEffect(() => {
    setMsSinceLastBlock(0);
  }, [currentBlock]);

  useEffect(() => {
    const waitMsBeforeWarning =
      (chainId
        ? CHAIN_INFO[chainId]?.blockWaitMsBeforeWarning
        : DEFAULT_MS_BEFORE_WARNING) ?? DEFAULT_MS_BEFORE_WARNING;

    timeout.current = setTimeout(() => {
      setMsSinceLastBlock(NETWORK_HEALTH_CHECK_MS + msSinceLastBlock);
      if (msSinceLastBlock > waitMsBeforeWarning && isWindowVisible) {
        dispatch(setChainConnectivityWarning({ warn: true }));
      } else if (chainConnectivityWarningActive) {
        dispatch(setChainConnectivityWarning({ warn: false }));
      }
    }, NETWORK_HEALTH_CHECK_MS);

    return function cleanup() {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [
    chainId,
    chainConnectivityWarningActive,
    dispatch,
    isWindowVisible,
    msSinceLastBlock,
    setMsSinceLastBlock,
  ]);
}

export default function Updater(): null {
  const { account, chainId, library } = useActiveWeb3React();
  const dispatch = useAppDispatch();
  const windowVisible = useIsWindowVisible();

  const [state, setState] = useState<{
    chainId: number | undefined;
    blockNumber: number | null;
  }>({
    chainId,
    blockNumber: null,
  });

  useBlockWarningTimer();

  const blockNumberCallback = useCallback(
    (blockNumber: number) => {
      setState((state) => {
        if (chainId === state.chainId) {
          if (typeof state.blockNumber !== 'number')
            return { chainId, blockNumber };
          return {
            chainId,
            blockNumber: Math.max(blockNumber, state.blockNumber),
          };
        }
        return state;
      });
    },
    [chainId, setState]
  );

  // attach/detach listeners
  useEffect(() => {
    if (!account || !library || !chainId || !windowVisible) return undefined;

    setState({ chainId, blockNumber: null });

    library
      .getBlockNumber()
      .then(blockNumberCallback)
      .catch((error) =>
        console.error(
          `Failed to get block number for chainId: ${chainId}`,
          error
        )
      );

    library.on('block', blockNumberCallback);
    return () => {
      library.removeListener('block', blockNumberCallback);
    };
  }, [dispatch, account, chainId, library, blockNumberCallback, windowVisible]);

  const debouncedState = useDebounce(state, 100);

  useEffect(() => {
    if (
      !debouncedState.chainId ||
      !debouncedState.blockNumber ||
      !windowVisible
    )
      return;
    dispatch(
      updateBlockNumber({
        chainId: debouncedState.chainId,
        blockNumber: debouncedState.blockNumber,
      })
    );
  }, [
    windowVisible,
    dispatch,
    debouncedState.blockNumber,
    debouncedState.chainId,
  ]);

  // chainId has changed
  useEffect(() => {
    dispatch(
      updateChainId({
        chainId: debouncedState.chainId
          ? supportedChainId(debouncedState.chainId) ?? null
          : null,
      })
    );
    //reset
    dispatch(resetOfYamato());
    dispatch(resetOfPledge());
    resetCache();
  }, [dispatch, debouncedState.chainId]);

  useEffect(() => {
    if (
      !account ||
      !library?.provider?.request ||
      !library?.provider?.isMetaMask
    ) {
      return;
    }
    switchToNetwork({ library })
      .then((x) => x ?? dispatch(setImplements3085({ implements3085: true })))
      .catch(() => dispatch(setImplements3085({ implements3085: false })));
  }, [account, chainId, dispatch, library]);

  return null;
}
