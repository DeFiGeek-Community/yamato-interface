import { calcFee, getFeeRate } from './calcFee';

describe('#calcFee', () => {
  it('should be correct', () => {
    const integer = 100;

    let result = calcFee(integer, 130);
    expect(result.fee).toBe(4);
    expect(result.feeRate).toBe(4);

    const decimal = 0.1;

    result = calcFee(decimal, 130);
    expect(result.fee).toBe(0.004);
    expect(result.feeRate).toBe(4);

    const exponential = 1e1;

    result = calcFee(exponential, 130);
    expect(result.fee).toBe(0.4);
    expect(result.feeRate).toBe(4);

    const zero = 0;

    result = calcFee(zero, 130);
    expect(result.fee).toBe(0);
    expect(result.feeRate).toBe(4);
  });
});

describe('#getFeeRate', () => {
  describe('13000 <= ICRperTenk && ICRperTenk < 15000', () => {
    it('should be correct', () => {
      const expected = 400;

      const fee = getFeeRate(13000);
      expect(fee).toBe(expected);
    });
  });

  describe('15000 <= ICRperTenk && ICRperTenk < 20000', () => {
    it('should be correct', () => {
      const expected = 200;

      const fee = getFeeRate(15000);
      expect(fee).toBe(expected);
    });
  });

  describe('20000 <= ICRperTenk && ICRperTenk < 50000', () => {
    it('should be correct', () => {
      const expected = 100;

      const fee = getFeeRate(20000);
      expect(fee).toBe(expected);
    });
  });

  describe('more than', () => {
    it('should be correct', () => {
      const expected = 10;

      // impossible
      const underMCR = getFeeRate(12000);
      expect(underMCR).toBe(expected);

      const over = getFeeRate(50000);
      expect(over).toBe(expected);
    });
  });
});
