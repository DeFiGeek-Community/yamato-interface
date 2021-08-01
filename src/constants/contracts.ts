import { constructSameAddressMap } from '../utils/constructSameAddressMap';
import { SupportedChainId } from './chains';

type AddressMap = { [chainId: number]: string };

/**
 * ENS
 */
export const ENS_REGISTRAR_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  [SupportedChainId.ROPSTEN]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  [SupportedChainId.GOERLI]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  [SupportedChainId.RINKEBY]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
};

export const MULTICALL2_ADDRESSES: AddressMap = {
  ...constructSameAddressMap(
    '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
    false
  ),
  [SupportedChainId.ARBITRUM_KOVAN]:
    '0xc80e33a6f02cf08557a0ca3d94d1474d73f64bc1',
  [SupportedChainId.ARBITRUM_ONE]: '0x021CeAC7e681dBCE9b5039d2535ED97590eB395c',
};
