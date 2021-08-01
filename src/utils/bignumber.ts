import Big from 'big.js';

export type BigNumberValueType = Big | number;

export function add(v1: BigNumberValueType, v2: BigNumberValueType): Big {
  const a = getBigNumber(v1);
  const b = getBigNumber(v2);
  return a.plus(b);
}
export function addToNum(
  v1: BigNumberValueType,
  v2: BigNumberValueType
): number {
  return add(v1, v2).toNumber();
}

export function subtract(v1: BigNumberValueType, v2: BigNumberValueType): Big {
  const a = getBigNumber(v1);
  const b = getBigNumber(v2);
  return a.minus(b);
}
export function subtractToNum(
  v1: BigNumberValueType,
  v2: BigNumberValueType
): number {
  return subtract(v1, v2).toNumber();
}

export function multiply(v1: BigNumberValueType, v2: BigNumberValueType): Big {
  const a = getBigNumber(v1);
  const b = getBigNumber(v2);
  return a.times(b);
}
export function multiplyToNum(
  v1: BigNumberValueType,
  v2: BigNumberValueType
): number {
  return multiply(v1, v2).toNumber();
}

export function divide(v1: BigNumberValueType, v2: BigNumberValueType): Big {
  const a = getBigNumber(v1);
  const b = getBigNumber(v2);
  return a.div(b);
}
export function divideToNum(
  v1: BigNumberValueType,
  v2: BigNumberValueType
): number {
  return divide(v1, v2).toNumber();
}

export function getBigNumber(val: BigNumberValueType | string): Big {
  if (val instanceof Big) {
    return val;
  }
  return new Big(val);
}
