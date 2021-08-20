import { createReducer } from '@reduxjs/toolkit';
import { fetchWallet } from './actions';

/**
 *  State gotten from Wallet such as Metamask.
 */
export interface WalletState {
  cjpy: number; // CJPY
  eth: number; // ETH
}

export const initialState: WalletState = {
  cjpy: 0,
  eth: 0,
};

export default createReducer(initialState, (builder) =>
  builder.addCase(fetchWallet, (state, { payload: { cjpy, eth } }) => {
    state.cjpy = cjpy;
    state.eth = eth;
  })
);
