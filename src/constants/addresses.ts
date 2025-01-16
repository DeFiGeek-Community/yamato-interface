import { constructSameAddressMap } from '../utils/constructSameAddressMap';
import { SupportedChainId } from './chains';

export type AddressMap = { [chainId: number]: string };
export type TokenAddressMap = { [token: string]: AddressMap };
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

/**
 * Yamato
 * TODO: Consider L2 and Upgradability. Probably access CurrencyOS.yamatoes and get addresses dynamically.
 */
export const YAMATO_MAIN_ADDRESSES: TokenAddressMap = {
  CJPY: {
    [SupportedChainId.MAINNET]: '0x02Fe72b2E9fF717EbF3049333B184E9Cd984f257',
    [SupportedChainId.GOERLI]: '0x5f4F8cc76DAC7b6820e2eF8b62bE636BF7fb53A2',
    [SupportedChainId.SEPOLIA]: '0xEc8023Bd4BF08993C96F1f23dbE858b42F6A393F',
    [SupportedChainId.LOCALHOST]: '0x0B306BF915C4d645ff596e518fAf3F9669b97016',
  },
  CUSD: {
    [SupportedChainId.MAINNET]: ZERO_ADDRESS,
    [SupportedChainId.GOERLI]: '0x5f4F8cc76DAC7b6820e2eF8b62bE636BF7fb53A2',
    [SupportedChainId.SEPOLIA]: '0x85E75558A01960aa1AbBE2D5b8d3eC000e49357F',
    [SupportedChainId.LOCALHOST]: '0xA4899D35897033b927acFCf422bc745916139776',
  },
  CEUR: {
    [SupportedChainId.MAINNET]: ZERO_ADDRESS,
    [SupportedChainId.GOERLI]: '0x5f4F8cc76DAC7b6820e2eF8b62bE636BF7fb53A2',
    [SupportedChainId.SEPOLIA]: '0x016bb215069678b4995aC2E44f7ef6a905AEdb55',
    [SupportedChainId.LOCALHOST]: '0x6F6f570F45833E249e27022648a26F4076F48f78',
  },
};
export const YAMATO_POOL_ADDRESSES: TokenAddressMap = {
  CJPY: {
    [SupportedChainId.MAINNET]: '0x9C1F0E3D4BD4A513721C028e1D4610CD17745f0B',
    [SupportedChainId.GOERLI]: '0x4a62A594FB6A1ea28241dBC6aCcAbC0330292769',
    [SupportedChainId.SEPOLIA]: '0x9650a8a61bac0Db321173aa8D749CaFd318BF417',
    [SupportedChainId.LOCALHOST]: '0x998abeb3E57409262aE5b751f60747921B33613E',
  },
  CUSD: {
    [SupportedChainId.MAINNET]: ZERO_ADDRESS,
    [SupportedChainId.GOERLI]: '0x4a62A594FB6A1ea28241dBC6aCcAbC0330292769',
    [SupportedChainId.SEPOLIA]: '0x1E363B22A4DD6d742eBDfA1F5eea290B2975f7C6',
    [SupportedChainId.LOCALHOST]: '0x276C216D241856199A83bf27b2286659e5b877D3',
  },
  CEUR: {
    [SupportedChainId.MAINNET]: ZERO_ADDRESS,
    [SupportedChainId.GOERLI]: '0x4a62A594FB6A1ea28241dBC6aCcAbC0330292769',
    [SupportedChainId.SEPOLIA]: '0x90fF86d10331bcd491ec69845720EA58e4778a32',
    [SupportedChainId.LOCALHOST]: '0x96F3Ce39Ad2BfDCf92C0F6E2C2CAbF83874660Fc',
  },
};

export const YAMATO_PRIORITY_REGISTRY_ADDRESSES: TokenAddressMap = {
  CJPY: {
    [SupportedChainId.MAINNET]: '0x0c9Bdf09de9EaCbE692dB2c17a75bfdB5FF4190B',
    [SupportedChainId.GOERLI]: '0xd55B6E565630E6C579F3Bcd75D65A0f72d4a1324',
    [SupportedChainId.SEPOLIA]: '0x01b3D06Df287AE66467B083ba632F0AEF1260388',
    [SupportedChainId.LOCALHOST]: '0x99bbA657f2BbC93c02D617f8bA121cB8Fc104Acf',
  },
  CUSD: {
    [SupportedChainId.MAINNET]: ZERO_ADDRESS,
    [SupportedChainId.GOERLI]: '0xd55B6E565630E6C579F3Bcd75D65A0f72d4a1324',
    [SupportedChainId.SEPOLIA]: '0x211aCCb3CfE3FBd800d8eD5d58A6B95C9Dff8B18',
    [SupportedChainId.LOCALHOST]: '0x5bf5b11053e734690269C6B9D438F8C9d48F528A',
  },
  CEUR: {
    [SupportedChainId.MAINNET]: ZERO_ADDRESS,
    [SupportedChainId.GOERLI]: '0xd55B6E565630E6C579F3Bcd75D65A0f72d4a1324',
    [SupportedChainId.SEPOLIA]: '0x006D4149A1AE384A1904C2CCD250af0353925A37',
    [SupportedChainId.LOCALHOST]: '0xefc1aB2475ACb7E60499Efb171D173be19928a05',
  },
};
export const YAMATO_PRICE_FEED_ADDRESSES: TokenAddressMap = {
  CJPY: {
    [SupportedChainId.MAINNET]: '0x3f4E4Dad0AC01Da50A774F3389b70506c96FfF2f',
    [SupportedChainId.GOERLI]: '0xD2472CeBde868565bdFAd66e5A697b14654FcdE4',
    [SupportedChainId.SEPOLIA]: '0xdaC81f657Fb347C2A3C5Dc480F1b1c725b06A599',
    [SupportedChainId.LOCALHOST]: '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853',
  },
  CUSD: {
    [SupportedChainId.MAINNET]: ZERO_ADDRESS,
    [SupportedChainId.GOERLI]: '0xD2472CeBde868565bdFAd66e5A697b14654FcdE4',
    [SupportedChainId.SEPOLIA]: '0x63758BdcC35ab0348998fB753C0977Fe4f660882',
    [SupportedChainId.LOCALHOST]: '0x367761085BF3C12e5DA2Df99AC6E1a824612b8fb',
  },
  CEUR: {
    [SupportedChainId.MAINNET]: ZERO_ADDRESS,
    [SupportedChainId.GOERLI]: '0xD2472CeBde868565bdFAd66e5A697b14654FcdE4',
    [SupportedChainId.SEPOLIA]: '0xa1c77a20481Ab022c09F5f8d3441F1A645c0e5b8',
    [SupportedChainId.LOCALHOST]: '0x40918Ba7f132E0aCba2CE4de4c4baF9BD2D7D849',
  },
};

/**
 * Token
 */
export const CJPY_ADDRESSES: TokenAddressMap = {
  CJPY: {
    [SupportedChainId.MAINNET]: '0x1cfa5641c01406aB8AC350dEd7d735ec41298372',
    [SupportedChainId.GOERLI]: '0x24611d7080f8510ff147e952C76F3482D77f40D4',
    [SupportedChainId.SEPOLIA]: '0xDED5F78d4fB19e935eb45dFf9912eB132F046782',
    [SupportedChainId.LOCALHOST]: '0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6',
  },
  CUSD: {
    [SupportedChainId.MAINNET]: ZERO_ADDRESS,
    [SupportedChainId.GOERLI]: '0x24611d7080f8510ff147e952C76F3482D77f40D4',
    [SupportedChainId.SEPOLIA]: '0x5Cf9BD4Ef62AE7C7847cCCBB67Cc0d629065687a',
    [SupportedChainId.LOCALHOST]: '0x4C2F7092C2aE51D986bEFEe378e50BD4dB99C901',
  },
  CEUR: {
    [SupportedChainId.MAINNET]: ZERO_ADDRESS,
    [SupportedChainId.GOERLI]: '0x24611d7080f8510ff147e952C76F3482D77f40D4',
    [SupportedChainId.SEPOLIA]: '0x13E0eb063d05D2D77FE6E1F5a6e96379771C196D',
    [SupportedChainId.LOCALHOST]: '0xF32D39ff9f6Aa7a7A64d7a4F00a54826Ef791a55',
  },
};
export const YMT_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: ZERO_ADDRESS,
  [SupportedChainId.GOERLI]: ZERO_ADDRESS,
  [SupportedChainId.SEPOLIA]: '0x67bE87A96bF2306D0bc42c60EdAc51637b882eB9',
  [SupportedChainId.LOCALHOST]: '0x1fA02b2d6A771842690194Cf62D91bdd92BfE28d',
};
export const VEYMT_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: ZERO_ADDRESS,
  [SupportedChainId.GOERLI]: ZERO_ADDRESS,
  [SupportedChainId.SEPOLIA]: '0xfF62eFe9097467Fb2B2adD94B2334764a57bD197',
  [SupportedChainId.LOCALHOST]: '0xdbC43Ba45381e02825b14322cDdd15eC4B3164E6',
};
export const WRAPPED_ETHER_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  [SupportedChainId.GOERLI]: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
  [SupportedChainId.SEPOLIA]: '0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9',
  [SupportedChainId.LOCALHOST]: '0x0000000000000000000000000000000000000000',
};
export const TXJP_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x961dd84059505d59f82ce4fb87d3c09bec65301d',
  [SupportedChainId.GOERLI]: '0xeb50368411ABC751fFc3216A4f7df7038592d182',
  [SupportedChainId.SEPOLIA]: ZERO_ADDRESS,
  [SupportedChainId.LOCALHOST]: ZERO_ADDRESS,
};

/**
 * ENS
 */
export const ENS_REGISTRAR_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  [SupportedChainId.GOERLI]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  [SupportedChainId.SEPOLIA]: ZERO_ADDRESS,
  [SupportedChainId.LOCALHOST]: ZERO_ADDRESS,
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
export const CURVE_POOL_ADDRESS: TokenAddressMap = {
  CJPY: {
    [SupportedChainId.MAINNET]: '0x592878b920101946Fb5915aB97961bC546f211CC',
    [SupportedChainId.GOERLI]: ZERO_ADDRESS,
    [SupportedChainId.SEPOLIA]: ZERO_ADDRESS,
  },
  CUSD: {
    [SupportedChainId.MAINNET]: ZERO_ADDRESS,
    [SupportedChainId.GOERLI]: ZERO_ADDRESS,
    [SupportedChainId.SEPOLIA]: ZERO_ADDRESS,
  },
  CEUR: {
    [SupportedChainId.MAINNET]: ZERO_ADDRESS,
    [SupportedChainId.GOERLI]: ZERO_ADDRESS,
    [SupportedChainId.SEPOLIA]: ZERO_ADDRESS,
  },
};
