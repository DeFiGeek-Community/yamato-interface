import { divideToNum, getBigNumber, multiplyToNum } from './bignumber';

export type CryptoCurrency = 'eth' | 'txjp';
export type FiatCurrency = 'jpy';
export type CurrencyName = CryptoCurrency | FiatCurrency;

export function formatPrice(
  value: number,
  currency?: CurrencyName
): { value: string; isZeroByRound: boolean } {
  if (!value) {
    return { value: '0', isZeroByRound: false };
  }

  let decimalDigits = 18;
  if (currency) {
    // eth and erc20 may all be 9 digits.
    if (currency === 'eth') {
      decimalDigits = 9;
    } else if (currency === 'txjp') {
      decimalDigits = 8;
    } else if (currency === 'jpy') {
      decimalDigits = 4;
    }
  }

  const base = 10 ** decimalDigits;
  const flooredValue = Math.floor(multiplyToNum(value, base)) / base;
  if (!flooredValue) {
    return { value: '0', isZeroByRound: false };
  }
  const fixedValue = flooredValue.toFixed(decimalDigits); // to pad with zero to the right.
  return {
    value: format(fixedValue),
    isZeroByRound: isZeroByRound(fixedValue),
  };
}

function isZeroByRound(value: string): boolean {
  const numbers = value.split('.');
  if (!numbers[1]) {
    return false;
  }
  if (Number(numbers[0]) > 0) {
    return false;
  }

  return Number(numbers[1]) === 0;
}

function format(value: string) {
  let s = value.split('.');
  if (s.length > 1) {
    // eliminate unnecessary zero if it's not all zeros.
    // `0.0100` -> `0.01`
    // `0.0000` -> `0.0000` Keep. Don't chage!
    if (!(Number(s[0]) === 0 && s[1].match(/^(0)\1*$/))) {
      value = getBigNumber(value).toFixed();
      s = value.split('.');
    }
  }

  // add comma
  let ret = s[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
  if (s.length > 1) {
    ret += '.' + s[1];
  }

  return ret;
}

export function getFialSymbol(currency: FiatCurrency) {
  if (currency === 'jpy') {
    return '¥';
  }
  return '';
}

export function formatCollateralizationRatio(
  collateral: number,
  debt: number
): string {
  if (debt === 0) {
    return '0.00';
  }
  return Math.min(divideToNum(collateral, debt) * 100, 9999.9).toLocaleString(
    undefined,
    {
      maximumFractionDigits: 2,
    }
  );
}

export function getEthChangePercent(current: number, previous: number): number {
  if (current === 0 || previous === 0) {
    return 0;
  }

  return ((current - previous) / previous) * 100;
}
