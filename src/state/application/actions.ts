import { createAction } from '@reduxjs/toolkit';

export type PopupContent = {
  txn: {
    hash: string;
    success: boolean;
    summary?: string;
  };
};
// | {
//     listUpdate: {
//       listUrl: string;
//       oldList: TokenList;
//       newList: TokenList;
//       auto: boolean;
//     };
//   };

export enum ApplicationModal {
  WALLET,
  SETTINGS,
  // SELF_CLAIM,
  // ADDRESS_CLAIM,
  // CLAIM_POPUP,
  MENU,
  // DELEGATE,
  // VOTE,
  // POOL_OVERVIEW_OPTIONS,
}

export const updateBlockNumber = createAction<{
  chainId: number;
  blockNumber: number;
}>('application/updateBlockNumber');
export const setOpenModal = createAction<ApplicationModal | null>(
  'application/setOpenModal'
);
export const addPopup = createAction<{
  key?: string;
  removeAfterMs?: number | null;
  content: PopupContent;
}>('application/addPopup');
export const removePopup = createAction<{ key: string }>(
  'application/removePopup'
);

export const startTx = createAction('application/startTx');
export const setHash = createAction<{ hash: string; type: 'donate' | 'claim' }>(
  'application/setHash'
);
export const endTx = createAction<{ hash?: string }>('application/endTx');
