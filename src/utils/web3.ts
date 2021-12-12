import { getAddress } from '@ethersproject/address';
import { BigNumber } from '@ethersproject/bignumber';
import { AddressZero } from '@ethersproject/constants';
import { Contract } from '@ethersproject/contracts';
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { ethers } from 'ethers';

export const BIGNUMBER_ZERO = BigNumber.from(0);

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

// account is not optional
function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked();
}

// account is optional
function getProviderOrSigner(
  library: Web3Provider,
  account?: string
): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library;
}

// account is optional
export function getContract(
  address: string,
  ABI: any,
  library: Web3Provider,
  account?: string
): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(
    address,
    ABI,
    getProviderOrSigner(library, account) as any
  );
}

/**
 *
 * Additions for Yamato
 *
 */

// See: node_modules/@ethersproject/bignumber/src.ts/fixednumber.ts
const WEI_UNIT = 18;
let zeros = '0';
while (zeros.length < WEI_UNIT) {
  zeros += zeros;
}
// Returns a string "1" followed by decimal "0"s
function getMultiplier(decimals: ethers.BigNumberish): string {
  if (typeof decimals !== 'number') {
    try {
      decimals = BigNumber.from(decimals).toNumber();
    } catch (e) {}
  }

  if (typeof decimals !== 'number' || decimals < 0 || decimals > WEI_UNIT)
    return '0';

  return '1' + zeros.substring(0, decimals);
}

export function parseEther(ether: string): BigNumber {
  if (ether.includes('e')) {
    // Parse
    const integerPart = ether.match(/^([0-9])+e/);
    const isNegative = ether.includes('e-');
    const exponentialPart = ether.match(/^[0-9]+e-?([0-9]+)/);
    if (
      !integerPart ||
      !integerPart[1] ||
      !exponentialPart ||
      !exponentialPart[1]
    ) {
      return BigNumber.from(0);
    }

    // Resolve exponential number
    // Plus 18 to convert ETH to WEI
    const pow = getMultiplier(
      !isNegative
        ? Number(exponentialPart[1]) + 18
        : -Number(exponentialPart[1]) + 18
    );
    return BigNumber.from(integerPart[1]).mul(pow);
  }

  return ethers.utils.parseEther(ether);
}

export function formatEther(wei: ethers.BigNumberish) {
  return ethers.utils.formatEther(wei);
}

export function formatYen(value: ethers.BigNumberish) {
  return ethers.utils.formatEther(value);
}

export function formatCjpy(value: ethers.BigNumberish) {
  return ethers.utils.formatEther(value);
}

export async function getEthBalance(
  account: string | null | undefined,
  library: Web3Provider | undefined
): Promise<number> {
  return library && account
    ? Number(formatEther(await library.getBalance(account)))
    : 0;
}
