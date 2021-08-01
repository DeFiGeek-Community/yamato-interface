import { Contract } from '@ethersproject/contracts';
// import ARGENT_WALLET_DETECTOR_ABI from 'abis/argent-wallet-detector.json';
// import EIP_2612 from 'abis/eip_2612.json';
import { useMemo } from 'react';
import ENS_PUBLIC_RESOLVER_ABI from '../abis/ens-public-resolver.json';
import ENS_ABI from '../abis/ens-registrar.json';
import MULTICALL_ABI from '../abis/multicall2.json';
import {
  // ArgentWalletDetector,
  EnsPublicResolver,
  EnsRegistrar,
  Multicall2,
} from '../abis/types';
import { SupportedChainId } from '../constants/chains';
import {
  MULTICALL2_ADDRESSES,
  ENS_REGISTRAR_ADDRESSES,
} from '../constants/contracts';
import { getContract, useActiveWeb3React } from './useWeb3';

// // returns null on errors
export function useContract<T extends Contract = Contract>(
  addressOrAddressMap:
    | string
    | { [chainId in SupportedChainId]?: string }
    | undefined,
  ABI: any,
  withSignerIfPossible = true
): T | null {
  const { library, account, chainId } = useActiveWeb3React();

  return useMemo(() => {
    if (!addressOrAddressMap || !ABI || !library || !chainId) return null;
    let address: string | undefined;
    if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap;
    else address = addressOrAddressMap[chainId];
    if (!address) return null;
    try {
      return getContract(
        address,
        ABI,
        library,
        withSignerIfPossible && account ? account : undefined
      );
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [
    addressOrAddressMap,
    ABI,
    library,
    chainId,
    withSignerIfPossible,
    account,
  ]) as T;
}

// export function useTokenContract(
//   tokenAddress?: string,
//   withSignerIfPossible?: boolean
// ) {
//   return useContract<Erc20>(tokenAddress, ERC20_ABI, withSignerIfPossible);
// }

// export function useArgentWalletDetectorContract() {
//   return useContract<ArgentWalletDetector>(
//     ARGENT_WALLET_DETECTOR_ADDRESS,
//     ARGENT_WALLET_DETECTOR_ABI,
//     false
//   );
// }

export function useENSRegistrarContract(withSignerIfPossible?: boolean) {
  return useContract<EnsRegistrar>(
    ENS_REGISTRAR_ADDRESSES,
    ENS_ABI,
    withSignerIfPossible
  );
}

export function useENSResolverContract(
  address: string | undefined,
  withSignerIfPossible?: boolean
) {
  return useContract<EnsPublicResolver>(
    address,
    ENS_PUBLIC_RESOLVER_ABI,
    withSignerIfPossible
  );
}

// export function useEIP2612Contract(tokenAddress?: string): Contract | null {
//   return useContract(tokenAddress, EIP_2612, false);
// }

export function useMulticall2Contract() {
  return useContract<Multicall2>(
    MULTICALL2_ADDRESSES,
    MULTICALL_ABI,
    false
  ) as Multicall2;
}
