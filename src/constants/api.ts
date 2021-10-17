import { SupportedChainId } from './chains';

export const CHAIN_SUBGRAPH_V3_URL: Record<number, string> = {
  [SupportedChainId.MAINNET]:
    'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
  [SupportedChainId.RINKEBY]:
    'https://api.thegraph.com/subgraphs/name/bilalmir135/uniswap-v3',

  [SupportedChainId.ARBITRUM_ONE]:
    'https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-arbitrum-one',

  [SupportedChainId.OPTIMISM]:
    'https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-optimism-dev',
};

export const CHAIN_SUBGRAPH_V2_URL: Record<number, string> = {
  [SupportedChainId.MAINNET]:
    'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
  [SupportedChainId.RINKEBY]:
    'https://api.thegraph.com/subgraphs/name/bilalmir135/uniswap-v2',

  [SupportedChainId.ARBITRUM_ONE]:
    'https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-arbitrum-one',

  [SupportedChainId.OPTIMISM]:
    'https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-optimism-dev',
};
