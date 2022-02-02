import { Contract } from '@ethersproject/contracts';
// import ARGENT_WALLET_DETECTOR_ABI from 'abis/argent-wallet-detector.json';
// import EIP_2612 from 'abis/eip_2612.json';
import { abi as MulticallABI } from '@uniswap/v3-periphery/artifacts/contracts/lens/UniswapInterfaceMulticall.sol/UniswapInterfaceMulticall.json';
import { useMemo } from 'react';
import {
  ENS_REGISTRAR_ADDRESSES,
  YAMATO_MAIN_ADDRESSES,
  YAMATO_POOL_ADDRESSES,
  YAMATO_PRICE_FEED_ADDRESSES,
  CJPY_ADDRESSES,
  YMT_ADDRESSES,
  VEYMT_ADDRESSES,
  MULTICALL_ADDRESS,
  YAMATO_PRIORITY_REGISTRY_ADDRESSES,
} from '../constants/addresses';
import ENS_PUBLIC_RESOLVER_ABI from '../infrastructures/abis/external/ens-public-resolver.json';
import ENS_ABI from '../infrastructures/abis/external/ens-registrar.json';
import {
  // ArgentWalletDetector,
  Yamato,
  Pool,
  PriceFeed,
  YMT,
  VeYMT,
  EnsPublicResolver,
  EnsRegistrar,
  CJPY,
  UniswapInterfaceMulticall,
  PriorityRegistry,
} from '../infrastructures/abis/types';
import CJPY_ABI from '../infrastructures/abis/yamato/CJPY.json';
import YAMATO_POOL_ABI from '../infrastructures/abis/yamato/PoolV2.json';
import YAMATO_PRICE_FEED_ABI from '../infrastructures/abis/yamato/PriceFeed.json';
import YAMATO_PRIORITY_REGISTRY_ABI from '../infrastructures/abis/yamato/PriorityRegistryV5.json';
import YMT_ABI from '../infrastructures/abis/yamato/YMT.json';
import YAMATO_MAIN_ABI from '../infrastructures/abis/yamato/YamatoV2.json';
import VEYMT_ABI from '../infrastructures/abis/yamato/veYMT.json';
import { getContract } from '../utils/web3';
import { useActiveWeb3React } from './web3';

// returns null on errors
export function useContract<T extends Contract = Contract>(
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
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
export function useYamatoPriorityRegistryContract() {
  return useContract<PriorityRegistry>(
    YAMATO_PRIORITY_REGISTRY_ADDRESSES,
    YAMATO_PRIORITY_REGISTRY_ABI
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
  return useContract<UniswapInterfaceMulticall>(
    MULTICALL_ADDRESS,
    MulticallABI,
    false
  ) as UniswapInterfaceMulticall;
}
