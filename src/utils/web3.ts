import { getAddress } from '@ethersproject/address';
import { Web3Provider } from '@ethersproject/providers';
import { ethers } from 'ethers';

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address);
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
}

export function parseEther(ether: string) {
  return ethers.utils.parseEther(ether);
}

export function formatEther(wei: ethers.BigNumberish) {
  return ethers.utils.formatEther(wei);
}

export function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(
    provider,
    typeof provider.chainId === 'number'
      ? provider.chainId
      : typeof provider.chainId === 'string'
      ? parseInt(provider.chainId)
      : 'any'
  );
  library.pollingInterval = 15_000;
  return library;
}
