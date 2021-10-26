import { constructSameAddressMap } from '../utils/constructSameAddressMap';
import { SupportedChainId } from './chains';

type AddressMap = { [chainId: number]: string };

/**
 * Yamato
 * TODO: Consider L2 and Upgradability. Probably access CurrencyOS.yamatoes and get addresses dynamically.
 */
export type YamatoContractSort = 'main' | 'pool' | 'pricefeed';
export const YAMATO_MAIN_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x0000000000000000000000000000000000000000',
  [SupportedChainId.RINKEBY]: '0x752532Da6bd6a0c5B098703E6aa123DF76555b41',
};
export const YAMATO_POOL_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x0000000000000000000000000000000000000000',
  [SupportedChainId.RINKEBY]: '0xbd5cd60c8f7a6bcb1dd6ced9073ebb4cdd5dc99d',
};
export const YAMATO_PRICE_FEED_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x0000000000000000000000000000000000000000',
  [SupportedChainId.RINKEBY]: '0x5dBF987fB335510620C3dEe6F55Dcb8712796a3f',
};
export const YAMATO_PRIORITY_REGISTRY_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x0000000000000000000000000000000000000000',
  [SupportedChainId.RINKEBY]: '0x90442539Bc841Ae126cFE028b879C5B9cFd6578C',
};

/**
 * Token
 */
export const CJPY_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x0000000000000000000000000000000000000000',
  [SupportedChainId.RINKEBY]: '0x6fe5639e1fac1db3836a7a0b5c585c5784e75099',
};
export const YMT_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x0000000000000000000000000000000000000000',
  [SupportedChainId.RINKEBY]: '0x0000000000000000000000000000000000000000',
};
export const VEYMT_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x0000000000000000000000000000000000000000',
  [SupportedChainId.RINKEBY]: '0x0000000000000000000000000000000000000000',
};
export const WRAPPED_ETHER_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  [SupportedChainId.RINKEBY]: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
};

/**
 * ENS
 */
export const ENS_REGISTRAR_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  [SupportedChainId.RINKEBY]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
};

/**
 * Others
 */
export const MULTICALL_ADDRESS: AddressMap = {
  ...constructSameAddressMap('0x1F98415757620B543A52E61c46B32eB19261F984', [
    SupportedChainId.OPTIMISTIC_KOVAN,
  ]),
  [SupportedChainId.OPTIMISM]: '0x90f872b3d8f33f305e0250db6A2761B354f7710A',
  [SupportedChainId.ARBITRUM_ONE]: '0xadF885960B47eA2CD9B55E6DAc6B42b7Cb2806dB',
  [SupportedChainId.ARBITRUM_RINKEBY]:
    '0xa501c031958F579dB7676fF1CE78AD305794d579',
};
