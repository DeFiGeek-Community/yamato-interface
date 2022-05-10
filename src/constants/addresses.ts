import { constructSameAddressMap } from '../utils/constructSameAddressMap';
import { SupportedChainId } from './chains';

type AddressMap = { [chainId: number]: string };

/**
 * Yamato
 * TODO: Consider L2 and Upgradability. Probably access CurrencyOS.yamatoes and get addresses dynamically.
 */
export const YAMATO_MAIN_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x0000000000000000000000000000000000000000',
  [SupportedChainId.RINKEBY]: '0xD93fEB7Ab94cc29Ed6d4268bb90f8DB96CC21fA8',
};
export const YAMATO_POOL_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x0000000000000000000000000000000000000000',
  [SupportedChainId.RINKEBY]: '0xb86e7e12696ed2758a51eb5a54817fa4e09a52d2',
};
export const YAMATO_PRIORITY_REGISTRY_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x0000000000000000000000000000000000000000',
  [SupportedChainId.RINKEBY]: '0x778d08dee6dc17bc135e9a34953062e16c5a1062',
};
export const YAMATO_PRICE_FEED_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x0000000000000000000000000000000000000000',
  [SupportedChainId.RINKEBY]: '0x2C0f4A0b42827171F833451B7695De7137E6aeD3',
};

/**
 * Token
 */
export const CJPY_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x0000000000000000000000000000000000000000',
  [SupportedChainId.RINKEBY]: '0xae188e37f1d918ed7fc81a6037ce1682d8ffad8e',
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
export const TXJP_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x961dd84059505d59f82ce4fb87d3c09bec65301d',
  [SupportedChainId.RINKEBY]: '0x4ecc6088708a723b324c06f8fcfb0bb7753ac7b0',
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
