import { MCR } from '../../constants/yamato';

export function getCjpyPriceRank(cjpyPrice: number): number {
  const fixedPrice = Number(cjpyPrice.toFixed(2));
  const base = Math.floor(((fixedPrice - 1) / 2) * 100);
  if (base < -9) {
    return -10;
  } else if (base > 10) {
    return 10;
  }
  return base;
}

export function getEthPriceRank(changePercent: number): number {
  const base = Math.floor(changePercent * 100);
  // 91 ranks
  if (base < -45) {
    return -45;
  } else if (base > 45) {
    return 45;
  }
  return base;
}

export function getColorCodePerTcr(tcr: number): number {
  const base = Math.floor((tcr - MCR) / 2);
  if (base <= 0) {
    return 360;
  } else if (base > 20) {
    return 236;
  }
  return Math.floor(360 - base * 6.2);
}

export function getBrightnessPerEth(ethPriceRank: number): number {
  return 95 - Math.abs(ethPriceRank); // Max95% - Min50%
}
