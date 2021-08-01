import { formatPrice } from './prices';

describe('formatPrice', () => {
  describe('eth which is 9 decimal point digits', () => {
    it('works for min value', () => {
      const oneWei = 0.000000000000000001;
      expect(formatPrice(oneWei, 'eth').value).toBe('0.000000000');
    });

    it('works for interger', () => {
      const interger = 1;
      expect(formatPrice(interger, 'eth').value).toBe('1');
      expect(formatPrice(interger, 'eth').value).not.toBe('1.000000000');
    });

    it('works to be floored if overflow', () => {
      const floored = 0.0000000019;
      expect(formatPrice(floored, 'eth').value).toBe('0.000000001');
    });

    it('works that Unnecessary Zero is eliminated', () => {
      const eliminatedUnnecessaryZero = 0.0001;
      expect(formatPrice(eliminatedUnnecessaryZero, 'eth').value).toBe(
        '0.0001'
      );
      expect(formatPrice(eliminatedUnnecessaryZero, 'eth').value).not.toBe(
        '0.000100000'
      );
    });

    it('works for comma', () => {
      const comma = 12345.6789;
      expect(formatPrice(comma, 'eth').value).toBe('12,345.6789');
    });

    it('works that falsy value is 0', () => {
      const nonValue = null;
      expect(formatPrice(nonValue as any, 'eth').value).toBe('0');
      const reallyZero = 0;
      expect(formatPrice(reallyZero, 'eth').value).toBe('0');
    });
  });

  describe('txjp which is 8 decimal point digits', () => {
    it('works for min value', () => {
      const minValue = 0.00000001;
      expect(formatPrice(minValue, 'txjp').value).toBe('0.00000001');
    });

    it('works to be floored if overflow', () => {
      const floored = 0.000000019;
      expect(formatPrice(floored, 'txjp').value).toBe('0.00000001');
    });
  });

  describe('jpy which is 0 decimal point digits', () => {
    it('works for min value', () => {
      const minValue = 0.1;
      expect(formatPrice(minValue, 'jpy').value).toBe('0');
    });

    it('works to be floored if overflow', () => {
      const floored = 1.9;
      expect(formatPrice(floored, 'jpy').value).toBe('1');
    });

    it('works for comma', () => {
      const comma = 12345.6789;
      expect(formatPrice(comma, 'jpy').value).toBe('12,345');
    });
  });

  describe('isZeroByRound', () => {
    it('should be true', () => {
      const oneWei = 0.000000000000000001; // -> `0.000000000`
      expect(formatPrice(oneWei, 'eth').isZeroByRound).toBe(true);
    });

    it('should be false', () => {
      const interger = 1; // -> `1.000000000`
      expect(formatPrice(interger, 'eth').isZeroByRound).toBe(false);
      const fractional = 0.1;
      expect(formatPrice(fractional, 'eth').isZeroByRound).toBe(false);

      const nonValue = null;
      expect(formatPrice(nonValue as any, 'eth').isZeroByRound).toBe(false);
      const reallyZero = 0;
      expect(formatPrice(reallyZero, 'eth').isZeroByRound).toBe(false);
    });
  });
});
