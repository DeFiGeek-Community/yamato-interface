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
