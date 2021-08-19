import { GRR, MCR } from '../../../constants/yamato';

export function getExpectedCollateral(
  redemption: number,
  redeemableCandidate: number,
  rateOfEthJpy: number
) {
  const redeemableAmount =
    redemption > redeemableCandidate ? redeemableCandidate : redemption;
  const redeemableAmountPerEth = redeemableAmount / rateOfEthJpy;

  const expectedCollateral = redeemableAmountPerEth * ((100 - GRR) / 100);
  return expectedCollateral;
}

export function getRedeemableCandidate(
  totalCollateral: number,
  totalDebt: number,
  tcr: number,
  rateOfEthJpy: number
) {
  if (tcr >= MCR) {
    return 0;
  }

  const totalCollPerJpy = totalCollateral * rateOfEthJpy;
  return (totalDebt * MCR - totalCollPerJpy * 100) / MCR;
}
