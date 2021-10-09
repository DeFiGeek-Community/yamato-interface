import { createReducer } from '@reduxjs/toolkit';

import {
  ApplicationModal,
  setChainConnectivityWarning,
  setImplements3085,
  setOpenModal,
  updateBlockNumber,
  updateChainId,
} from './actions';

export interface ApplicationState {
  readonly blockNumber: { readonly [chainId: number]: number };
  readonly chainConnectivityWarning: boolean;
  readonly chainId: number | null;
  readonly implements3085: boolean;
  readonly openModal: ApplicationModal | null;
}

const initialState: ApplicationState = {
  blockNumber: {},
  chainConnectivityWarning: false,
  chainId: null,
  implements3085: false,
  openModal: null,
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateChainId, (state, action) => {
      const { chainId } = action.payload;
      state.chainId = chainId;
    })
    .addCase(updateBlockNumber, (state, action) => {
      const { chainId, blockNumber } = action.payload;
      if (typeof state.blockNumber[chainId] !== 'number') {
        state.blockNumber[chainId] = blockNumber;
      } else {
        state.blockNumber[chainId] = Math.max(
          blockNumber,
          state.blockNumber[chainId]
        );
      }
    })
    .addCase(setOpenModal, (state, action) => {
      state.openModal = action.payload;
    })
    .addCase(setImplements3085, (state, { payload: { implements3085 } }) => {
      state.implements3085 = implements3085;
    })
    .addCase(setChainConnectivityWarning, (state, { payload: { warn } }) => {
      state.chainConnectivityWarning = warn;
    })
);
