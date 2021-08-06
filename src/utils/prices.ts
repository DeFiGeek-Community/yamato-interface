import { COINGECKO_URL } from '../constants/api';
import { getBigNumber, multiplyToNum } from './bignumber';

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
      decimalDigits = 0;
    }
  }

  const base = 10 ** decimalDigits;
  const flooredValue = Math.floor(multiplyToNum(value, base)) / base;
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

/**
 * CoinGecko
 * https://www.coingecko.com/api/documentations/v3#/coins/get_coins_list
 */

export function getOracleUrlForFiatPriceOfToken(
  tokenName: string,
  fiatSymbol: FiatCurrency
) {
  return `${COINGECKO_URL}?ids=${tokenName}&vs_currencies=${fiatSymbol}`;
}

export function getTokenName(currency: CryptoCurrency) {
  if (currency === 'eth') {
    return 'ethereum';
  }
  return '';
}
