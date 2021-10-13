import { SupportedChainId } from '../constants/chains';

const ETHERSCAN_PREFIXES: { [chainId: number]: string } = {
  [SupportedChainId.MAINNET]: '',
  [SupportedChainId.RINKEBY]: 'rinkeby.',
};

export function getEtherscanLink(
  chainId: SupportedChainId,
  data: string,
  type: 'transaction' | 'token' | 'address' | 'block'
): string {
  const prefix = `https://${
    ETHERSCAN_PREFIXES[chainId] || ETHERSCAN_PREFIXES[1]
  }etherscan.io`;

  switch (type) {
    case 'transaction': {
      return `${prefix}/tx/${data}`;
    }
    case 'token': {
      return `${prefix}/token/${data}`;
    }
    case 'block': {
      return `${prefix}/block/${data}`;
    }
    case 'address':
    default: {
      return `${prefix}/address/${data}`;
    }
  }
}

export function goToEtherscan(chainId: SupportedChainId, hash: string) {
  window.open(getEtherscanLink(chainId, hash, 'transaction'), '_blank');
}
