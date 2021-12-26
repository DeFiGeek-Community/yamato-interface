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

export function getExpectedReward(candidateAmount: number, GRR: number) {
  return candidateAmount * (GRR / 100);
}

export function getRedeemableCandidate(
  redeemableCandidate: number,
  rateOfEthJpy: number
): { eth: number; cjpy: number } {
  if (!redeemableCandidate || !rateOfEthJpy) {
    return { eth: 0, cjpy: 0 };
  }

  const eth = redeemableCandidate / rateOfEthJpy;
  return { eth, cjpy: redeemableCandidate };
}

export function convertEthFromCjpy(value: number, rateOfEthJpy: number) {
  if (!rateOfEthJpy) {
    return 0;
  }
  const converted = value / rateOfEthJpy;
  return converted;
}
