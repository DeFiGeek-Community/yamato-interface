import { ethers, BigNumber } from 'ethers';
import { CurveTwocryptoOptimized } from '../../infrastructures/abis/types';

export async function fetchCjpyPriceFromCurve(
  curvePoolContract: CurveTwocryptoOptimized | null
): Promise<number | null> {
  if (!curvePoolContract) return null;

  try {
    const ONE_ETH = BigNumber.from('1000000000000000000');  // 1 ETH in wei (18 decimals)
    const price: BigNumber = await curvePoolContract.get_dy(1, 0, ONE_ETH);
    if (price.isZero()) return null;

    const formattedPrice = Number(
      ethers.utils.formatUnits(BigNumber.from(10).pow(36).div(price), 18)
    );
    return formattedPrice;
  } catch (error) {
    console.error('Error fetching price from Curve:', error);
    return null;
  }
}
