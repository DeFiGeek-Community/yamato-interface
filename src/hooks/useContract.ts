import { Contract } from '@ethersproject/contracts';
// import ARGENT_WALLET_DETECTOR_ABI from 'abis/argent-wallet-detector.json';
// import EIP_2612 from 'abis/eip_2612.json';
import { useMemo } from 'react';
import { SupportedChainId } from '../constants/chains';
import {
  MULTICALL2_ADDRESSES,
  ENS_REGISTRAR_ADDRESSES,
  YAMATO_MAIN_ADDRESSES,
  YAMATO_POOL_ADDRESSES,
  YAMATO_PRICE_FEED_ADDRESSES,
  CJPY_ADDRESSES,
  YMT_ADDRESSES,
  VEYMT_ADDRESSES,
} from '../constants/contracts';
import ENS_PUBLIC_RESOLVER_ABI from '../infrastructures/abis/external-abis/ens-public-resolver.json';
import ENS_ABI from '../infrastructures/abis/external-abis/ens-registrar.json';
import MULTICALL_ABI from '../infrastructures/abis/external-abis/multicall2.json';
import {
  // ArgentWalletDetector,
  Yamato,
  Pool,
  PriceFeed,
  YMT,
  VeYMT,
  EnsPublicResolver,
  EnsRegistrar,
  Multicall2,
  CJPY,
} from '../infrastructures/abis/types';
import CJPY_ABI from '../infrastructures/abis/yamato-abis/CJPY.json';
import YAMATO_POOL_ABI from '../infrastructures/abis/yamato-abis/Pool.json';
import YAMATO_PRICE_FEED_ABI from '../infrastructures/abis/yamato-abis/PriceFeed.json';
import YMT_ABI from '../infrastructures/abis/yamato-abis/YMT.json';
import YAMATO_MAIN_ABI from '../infrastructures/abis/yamato-abis/Yamato.json';
import VEYMT_ABI from '../infrastructures/abis/yamato-abis/veYMT.json';
import { getContract, useActiveWeb3React } from './web3';

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

/**
 * Yamato
 */
export function useYamatoMainContract() {
  return useContract<Yamato>(YAMATO_MAIN_ADDRESSES, YAMATO_MAIN_ABI);
}
export function useYamatoPoolContract() {
  return useContract<Pool>(YAMATO_POOL_ADDRESSES, YAMATO_POOL_ABI);
}
export function useYamatoPriceFeedContract() {
  return useContract<PriceFeed>(
    YAMATO_PRICE_FEED_ADDRESSES,
    YAMATO_PRICE_FEED_ABI
  );
}

/**
 * Token
 */
export function useCjpyContract() {
  return useContract<CJPY>(CJPY_ADDRESSES, CJPY_ABI);
}
export function useYmtContract() {
  return useContract<YMT>(YMT_ADDRESSES, YMT_ABI);
}
export function useVeYmtContract() {
  return useContract<VeYMT>(VEYMT_ADDRESSES, VEYMT_ABI);
}

// export function useArgentWalletDetectorContract() {
//   return useContract<ArgentWalletDetector>(
//     ARGENT_WALLET_DETECTOR_ADDRESS,
//     ARGENT_WALLET_DETECTOR_ABI,
//     false
//   );
// }

/**
 * ENS
 */
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
