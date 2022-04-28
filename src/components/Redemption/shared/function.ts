export function getExpectedReward(
  candidateAmount: number,
  isCore: boolean,
  GRR: number,
  rateOfEthJpy: number
) {
  if (candidateAmount <= 0 || !rateOfEthJpy) {
    return { eth: 0, cjpy: 0 };
  }

  if (isCore) {
    candidateAmount *= GRR / 100;
  }

  const eth = convertEthFromCjpy(candidateAmount, rateOfEthJpy);
  return { eth, cjpy: candidateAmount };
}

export function getRedeemableCandidate(
  redeemableCandidate: number,
  rateOfEthJpy: number
): { eth: number; cjpy: number } {
  if (!redeemableCandidate || !rateOfEthJpy) {
    return { eth: 0, cjpy: 0 };
  }

  const eth = convertEthFromCjpy(redeemableCandidate, rateOfEthJpy);
  return { eth, cjpy: redeemableCandidate };
}

export function convertEthFromCjpy(value: number, rateOfEthJpy: number) {
  if (!rateOfEthJpy) {
    return 0;
  }
  const converted = value / rateOfEthJpy;
  return converted;
}
