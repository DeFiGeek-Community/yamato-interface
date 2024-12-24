import { ethers, BigNumber } from 'ethers';
import { CurveTwocryptoOptimized } from '../../infrastructures/abis/types';

export async function fetchCjpyPriceFromCurve(
  curvePoolContract: CurveTwocryptoOptimized | null
): Promise<number | null> {
  if (!curvePoolContract) return null;

  try {
    const price: BigNumber = await curvePoolContract.price_scale();
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
