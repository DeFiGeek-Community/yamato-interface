import { BigNumber } from '@ethersproject/bignumber';
import { ethers } from 'ethers';
import { parseEther } from './web3';

// const ethByWei = '1000000000000000000';

describe('parseEther', () => {
  it('should pass through to `ehters.utils.parseEther`', () => {
    const interger = 10;
    expect(parseEther(interger.toString())).toEqual(
      ethers.utils.parseEther(interger.toString())
    );

    const decimal = 0.1;
    expect(parseEther(decimal.toString())).toEqual(
      ethers.utils.parseEther(decimal.toString())
    );
  });

  it('should handle exponential notation', () => {
    const exponential = 1e-18;
    expect(parseEther(exponential.toString())).toEqual(BigNumber.from(1));
  });

  it('should be zero', () => {
    const expectedValue = BigNumber.from(0);

    const zeroValue = '0';
    expect(parseEther(zeroValue)).toEqual(expectedValue);

    const underDigits = '1e-19';
    expect(parseEther(underDigits)).toEqual(expectedValue);
  });
});
