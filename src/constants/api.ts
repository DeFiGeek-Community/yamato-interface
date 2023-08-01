import { SupportedChainId } from './chains';

const INFURA_KEY = process.env.REACT_APP_INFURA_KEY;
if (typeof INFURA_KEY === 'undefined') {
  throw new Error(
    `REACT_APP_INFURA_KEY must be a defined environment variable`
  );
}

// default is mainnet.
export const DEFAULT_CHAINID = Number(
  process.env.REACT_APP_DEFAULT_CHAINID ?? 1
);
export const NETWORK_URLS: { [key in SupportedChainId]: string } = {
  [SupportedChainId.MAINNET]: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.GOERLI]: `https://goerli.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.SEPOLIA]: `https://sepolia.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.OPTIMISM]: `https://optimism-mainnet.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.OPTIMISTIC_KOVAN]: `https://optimism-kovan.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.ARBITRUM_ONE]: `https://arbitrum-mainnet.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.ARBITRUM_RINKEBY]: `https://arbitrum-rinkeby.infura.io/v3/${INFURA_KEY}`,
};

const ENABLE_SUBGRAPH = process.env.REACT_APP_ENABLE_SUBGRAPH;
// default will be true.
export const isEnableSubgraph =
  typeof ENABLE_SUBGRAPH === 'undefined' || ENABLE_SUBGRAPH === 'true';
export const SUBGRAPH_YAMATO_URLS: Record<number, string> = {
  [SupportedChainId.MAINNET]: '',
  [SupportedChainId.GOERLI]:
    'https://api.thegraph.com/subgraphs/name/subgraph-account/yamato_test_subgraph',
  [SupportedChainId.SEPOLIA]:
    'https://api.studio.thegraph.com/query/35420/yamato-subgraph/version/latest',
};

export const SUBGRAPH_UNISWAP_V3_URLS: Record<number, string> = {
  [SupportedChainId.MAINNET]:
    'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
  [SupportedChainId.GOERLI]: '',
  [SupportedChainId.SEPOLIA]: '',
  [SupportedChainId.ARBITRUM_ONE]:
    'https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-arbitrum-one',
  [SupportedChainId.OPTIMISM]:
    'https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-optimism-dev',
};

export const SUBGRAPH_UNISWAP_V2_URLS: Record<number, string> = {
  [SupportedChainId.MAINNET]: '',
  [SupportedChainId.GOERLI]: '',
  [SupportedChainId.SEPOLIA]: '',
  [SupportedChainId.ARBITRUM_ONE]:
    'https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-arbitrum-one',
  [SupportedChainId.OPTIMISM]:
    'https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-optimism-dev',
};
