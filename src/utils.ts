import { Address } from "viem";
import { SupportedChainId } from "./constants/chains";

export enum ExplorerDataType {
  TRANSACTION = "transaction",
  TOKEN = "token",
  ADDRESS = "address",
  BLOCK = "block",
}

export function roundDecimal(value: number | string, decimals = 2): string {
  const numVal = typeof value === "number" ? value : parseFloat(value);

  if (isNaN(numVal)) {
    return "0";
  }

  return numVal.toFixed(decimals);
}

export function formatWithComma(
  value: number | string,
  isRound: boolean = true,
  decimals: number = 2
) {
  let strVal: string;

  if (isRound) {
    strVal = roundDecimal(value, decimals);
  } else {
    strVal = value.toString();
  }

  let [intPart, fracPart] = strVal.split(".");

  if (!fracPart) {
    return intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  if (/^0+$/.test(fracPart)) {
    const commaInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `${commaInt}.${fracPart}`;
  } else {
    fracPart = fracPart.replace(/0+$/, "");
  }

  intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  if (!fracPart) {
    return intPart;
  }
  return `${intPart}.${fracPart}`;
}

export const minBigInt = (a: bigint, b: bigint): bigint => (a < b ? a : b);

export function getExplorerLink(
  chainId: number,
  data: string,
  type: ExplorerDataType
): string {
  const ETHERSCAN_PREFIXES: { [chainId: number]: string } = {
    [SupportedChainId.MAINNET]: "",
    [SupportedChainId.SEPOLIA]: "sepolia.",
  };

  const prefix = `https://${ETHERSCAN_PREFIXES[chainId] ?? ""}etherscan.io`;

  switch (type) {
    case ExplorerDataType.TRANSACTION:
      return `${prefix}/tx/${data}`;
    case ExplorerDataType.TOKEN:
      return `${prefix}/token/${data}`;
    case ExplorerDataType.BLOCK:
      return `${prefix}/block/${data}`;
    case ExplorerDataType.ADDRESS:
      return `${prefix}/address/${data}`;
    default:
      return `${prefix}`;
  }
}

export const truncateEthAddress = (address: Address) => {
  const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;
  const match = address.match(truncateRegex);
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};
