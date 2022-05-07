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

export function getEthAmountFromCjpy(
  amountOfCjpy: number,
  rateOfEthJpy: number
): { eth: number; cjpy: number } {
  if (!amountOfCjpy || !rateOfEthJpy) {
    return { eth: 0, cjpy: 0 };
  }

  const eth = convertEthFromCjpy(amountOfCjpy, rateOfEthJpy);
  return { eth, cjpy: amountOfCjpy };
}

export function convertEthFromCjpy(amountOfJpy: number, rateOfEthJpy: number) {
  if (!rateOfEthJpy) {
    return 0;
  }
  const converted = amountOfJpy / rateOfEthJpy;
  return converted;
}
