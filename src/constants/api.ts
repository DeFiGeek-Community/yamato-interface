const subgraphName = 'txjp_ibco_1';
const rinkebySubgraphName = 'txjp_ibco_testnet_1';
export const SUBGRAPH_HTTP_ENDPOINT = `https://api.thegraph.com/subgraphs/name/0xteatwo/${
  process.env.REACT_APP_CHAIN === 'mainnet' ? subgraphName : rinkebySubgraphName
}`;
export const SUBGRAPH_WSS_ENDPOINT = `wss://api.thegraph.com/subgraphs/name/0xteatwo/${
  process.env.REACT_APP_CHAIN === 'mainnet' ? subgraphName : rinkebySubgraphName
}`;
