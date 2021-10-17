import { request, gql } from 'graphql-request';
import {
  CJPY_ADDRESSES,
  WRAPPED_ETHER_ADDRESS,
} from '../../constants/addresses';
import {
  CHAIN_SUBGRAPH_V2_URL,
  CHAIN_SUBGRAPH_V3_URL,
} from '../../constants/api';
import { SupportedChainId } from '../../constants/chains';
import { Pool } from '../../infrastructures/subgraph/uniswap/generated-v3';

const v3Query = gql`
  query cjpyPriceV3($tokenAddress0: String!, $tokenAddress1: String!) {
    asToken0: pools(where: { token0: $tokenAddress0, token1: $tokenAddress1 }) {
      id
      token0 {
        id
        name
      }
      token1 {
        id
        name
      }
      token0Price
      token1Price
      feeTier
    }
    asToken1: pools(where: { token0: $tokenAddress1, token1: $tokenAddress0 }) {
      id
      token0 {
        id
        name
      }
      token1 {
        id
        name
      }
      token0Price
      token1Price
      feeTier
    }
  }
`;

const v2Query = gql`
  query cjpyPriceV2($tokenAddress0: String!, $tokenAddress1: String!) {
    asToken0: pairs(where: { token0: $tokenAddress0, token1: $tokenAddress1 }) {
      id
      token0 {
        id
        name
      }
      token1 {
        id
        name
      }
      token0Price
      token1Price
    }
    asToken1: pairs(where: { token0: $tokenAddress1, token1: $tokenAddress0 }) {
      id
      token0 {
        id
        name
      }
      token1 {
        id
        name
      }
      token0Price
      token1Price
    }
  }
`;

export async function fetchCjpyPriceFromUniswap(
  version: 'v2' | 'v3',
  chainId: SupportedChainId
) {
  const endpoint =
    version === 'v2'
      ? CHAIN_SUBGRAPH_V2_URL[chainId]
      : CHAIN_SUBGRAPH_V3_URL[chainId];
  const cjpyAddress = CJPY_ADDRESSES[chainId].toLowerCase();
  const wethAddress = WRAPPED_ETHER_ADDRESS[chainId].toLowerCase();

  const query = version === 'v2' ? v2Query : v3Query;
  const variables = {
    tokenAddress0: cjpyAddress,
    tokenAddress1: wethAddress,
  };

  const data = await request(endpoint, query, variables);

  if (version === 'v2') {
    if (data.asToken0.length > 0) {
      return Number(data.asToken0[0].token0Price);
    } else if (data.asToken1.length > 0) {
      return Number(data.asToken1[0].token1Price);
    }
    return 0;
  }
  // v3
  if (data.asToken0.length > 0) {
    return getMidPrice(data.asToken0, 'token0Price');
  } else if (data.asToken1.length > 0) {
    return getMidPrice(data.asToken1, 'token1Price');
  }
  return 0;
}

function getMidPrice(pools: Pool[], pairType: 'token0Price' | 'token1Price') {
  const prices = pools
    .map((pool) => Number(pool[pairType]))
    .sort((a, b) => (a < b ? -1 : 1));

  const lower = prices[0];
  const higher = prices[prices.length - 1];

  const duration = (higher - lower) / 2;
  return lower + duration;
}
