import { createAction } from '@reduxjs/toolkit';

export type PopupContent = {
  txn: {
    hash: string;
  };
};

export enum ApplicationModal {
  WALLET,
  SETTINGS,
  MENU,
  NETWORK_SELECTOR,
}

export const updateChainId = createAction<{ chainId: number | null }>(
  'application/updateChainId'
);
export const updateBlockNumber = createAction<{
  chainId: number;
  blockNumber: number;
}>('application/updateBlockNumber');
export const setOpenModal = createAction<ApplicationModal | null>(
  'application/setOpenModal'
);

export const setImplements3085 = createAction<{ implements3085: boolean }>(
  'application/setImplements3085'
);
export const setChainConnectivityWarning = createAction<{ warn: boolean }>(
  'application/setChainConnectivityWarning'
);
