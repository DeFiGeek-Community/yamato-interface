import { SupportedChainId } from './chains';

type AddressMap = { [chainId: number]: string };
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

/**
 * Yamato
 * TODO: Consider L2 and Upgradability. Probably access CurrencyOS.yamatoes and get addresses dynamically.
 */
export const YAMATO_MAIN_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x02Fe72b2E9fF717EbF3049333B184E9Cd984f257',
  [SupportedChainId.SEPOLIA]: '0xEc8023Bd4BF08993C96F1f23dbE858b42F6A393F',
};
export const YAMATO_POOL_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x9C1F0E3D4BD4A513721C028e1D4610CD17745f0B',
  [SupportedChainId.SEPOLIA]: '0x9650a8a61bac0Db321173aa8D749CaFd318BF417',
};
export const YAMATO_PRIORITY_REGISTRY_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x0c9Bdf09de9EaCbE692dB2c17a75bfdB5FF4190B',
  [SupportedChainId.SEPOLIA]: '0x01b3D06Df287AE66467B083ba632F0AEF1260388',
};
export const YAMATO_PRICE_FEED_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x3f4E4Dad0AC01Da50A774F3389b70506c96FfF2f',
  [SupportedChainId.SEPOLIA]: '0xdaC81f657Fb347C2A3C5Dc480F1b1c725b06A599',
};

/**
 * Token
 */
export const CJPY_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x1cfa5641c01406aB8AC350dEd7d735ec41298372',
  [SupportedChainId.GOERLI]: '0x24611d7080f8510ff147e952C76F3482D77f40D4',
  [SupportedChainId.SEPOLIA]: '0xDED5F78d4fB19e935eb45dFf9912eB132F046782',
};
export const YMT_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: ZERO_ADDRESS,
  [SupportedChainId.GOERLI]: ZERO_ADDRESS,
  [SupportedChainId.SEPOLIA]: '0x67bE87A96bF2306D0bc42c60EdAc51637b882eB9',
};
export const VEYMT_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: ZERO_ADDRESS,
  [SupportedChainId.GOERLI]: ZERO_ADDRESS,
  [SupportedChainId.SEPOLIA]: '0xfF62eFe9097467Fb2B2adD94B2334764a57bD197',
};
export const WRAPPED_ETHER_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  [SupportedChainId.GOERLI]: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
  [SupportedChainId.SEPOLIA]: '0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9',
};
export const TXJP_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x961dd84059505d59f82ce4fb87d3c09bec65301d',
  [SupportedChainId.GOERLI]: '0xeb50368411ABC751fFc3216A4f7df7038592d182',
  [SupportedChainId.SEPOLIA]: ZERO_ADDRESS,
};

export const CURVE_POOL_ADDRESS = {
  [SupportedChainId.MAINNET]: '0x592878b920101946Fb5915aB97961bC546f211CC',
  [SupportedChainId.GOERLI]: ZERO_ADDRESS,
  [SupportedChainId.SEPOLIA]: ZERO_ADDRESS,
};
