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

export async function getEthBalance(
  account: string | null | undefined,
  library: Web3Provider | undefined
): Promise<number> {
  return library && account
    ? Number(formatEther(await library.getBalance(account)))
    : 0;
}
