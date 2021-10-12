export function getExpectedCollateral(
  redemption: number,
  redeemableCandidate: number,
  GRR: number
) {
  const redeemableAmount =
    redemption > redeemableCandidate ? redeemableCandidate : redemption;

  const expectedCollateral = redeemableAmount * ((100 - GRR) / 100);
  return expectedCollateral;
}

export function getRedeemableCandidate(
  totalCollateral: number,
  totalDebt: number,
  tcr: number,
  rateOfEthJpy: number,
  MCR: number
): { eth: number; cjpy: number } {
  if (tcr >= MCR || !rateOfEthJpy) {
    return { eth: 0, cjpy: 0 };
  }

  const totalDebtPerEth = totalDebt / rateOfEthJpy;
  const valueOfEth = (MCR * totalDebtPerEth) / 100 - totalCollateral; // (totalColl + x) / totalDebt * 100 = MCR  ->  x = MCR * totalDebt / 100 - totalColl
  const valueOfCjpy = valueOfEth * rateOfEthJpy;
  return { eth: valueOfEth, cjpy: valueOfCjpy };
}

export function getEthFromCjpy(value: number, rateOfEthJpy: number) {
  if (!rateOfEthJpy) {
    return 0;
  }
  const converted = value / rateOfEthJpy;
  return converted;
}
