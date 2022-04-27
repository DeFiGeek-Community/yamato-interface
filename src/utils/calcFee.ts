import { multiplyToNum } from './bignumber';

export function calcFee(
  borrowingAmount: number,
  ICR: number
): { fee: number; feeRate: number } {
  const ICRperTenk = (ICR / 10) * 1000;
  const feeRate = getFeeRate(ICRperTenk);

  const fee = multiplyToNum(borrowingAmount, feeRate) / 10000;
  return { fee, feeRate: feeRate / 100 };
}

// Ported from FR in yamato/contracts/Dependencies/PledgeLib.sol
export function getFeeRate(ICRperTenk: number) {
  if (13000 <= ICRperTenk && ICRperTenk < 15000) {
    return 400 - ((ICRperTenk - 13000) * 10) / 100;
  } else if (15000 <= ICRperTenk && ICRperTenk < 20000) {
    return 200 - ((ICRperTenk - 15000) * 2) / 100;
  } else if (20000 <= ICRperTenk && ICRperTenk < 50000) {
    return 100 - ((ICRperTenk - 20000) * 3) / 10 / 100;
  } else {
    return 10;
  }
}
