import { useCallback } from 'react';
import { useActiveWeb3React } from '../../hooks/web3';
import { useAppDispatch, useAppSelector } from '../hooks';

import { AppState } from '../index';
import { ApplicationModal, setOpenModal } from './actions';

export function useBlockNumber(): number | undefined {
  const { chainId } = useActiveWeb3React();

  return useAppSelector(
    (state: AppState) => state.application.blockNumber[chainId ?? -1]
  );
}

export function useModalOpen(modal: ApplicationModal): boolean {
  const openModal = useAppSelector(
    (state: AppState) => state.application.openModal
  );
  return openModal === modal;
}

export function useToggleModal(modal: ApplicationModal): () => void {
  const open = useModalOpen(modal);
  const dispatch = useAppDispatch();
  return useCallback(
    () => dispatch(setOpenModal(open ? null : modal)),
    [dispatch, modal, open]
  );
}

export function useWalletModalToggle(): () => void {
  return useToggleModal(ApplicationModal.WALLET);
}
