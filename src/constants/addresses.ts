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
  [SupportedChainId.RINKEBY]: '0xf24067cfe4aF6aa3f8DD47f27Df53a99F617D702',
};
export const YAMATO_POOL_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x0000000000000000000000000000000000000000',
  [SupportedChainId.RINKEBY]: '0xb07e852C31Cfd5Fde97861D70a7FEB11a6252dD2',
};
export const YAMATO_PRICE_FEED_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x0000000000000000000000000000000000000000',
  [SupportedChainId.RINKEBY]: '0x5dBF987fB335510620C3dEe6F55Dcb8712796a3f',
};

/**
 * Token
 */
export const CJPY_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x0000000000000000000000000000000000000000',
  [SupportedChainId.RINKEBY]: '0xE5487D987cc65e971cf5B7820716783c465a192c',
};
export const YMT_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x0000000000000000000000000000000000000000',
  [SupportedChainId.RINKEBY]: '0x0000000000000000000000000000000000000000',
};
export const VEYMT_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x0000000000000000000000000000000000000000',
  [SupportedChainId.RINKEBY]: '0x0000000000000000000000000000000000000000',
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
