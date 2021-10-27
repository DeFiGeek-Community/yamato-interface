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
  [SupportedChainId.RINKEBY]: '0xBA29557591b66f973Ee21CA97b435b4071B71A03',
};
export const YAMATO_POOL_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x0000000000000000000000000000000000000000',
  [SupportedChainId.RINKEBY]: '0xCF44eCA56895a9FDaBbF994bA24Efe887610EA74',
};
export const YAMATO_PRICE_FEED_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x0000000000000000000000000000000000000000',
  [SupportedChainId.RINKEBY]: '0x5dBF987fB335510620C3dEe6F55Dcb8712796a3f',
};
export const YAMATO_PRIORITY_REGISTRY_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x0000000000000000000000000000000000000000',
  [SupportedChainId.RINKEBY]: '0x34FcEE2BC5A9526764eb71EcF99ae3FAffD3CEd7',
};

/**
 * Token
 */
export const CJPY_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x0000000000000000000000000000000000000000',
  [SupportedChainId.RINKEBY]: '0x33926D4a080b8900A972Db225Da858B336EbAd2D',
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
