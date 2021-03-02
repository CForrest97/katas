import { isPandigitalExpression } from '../../src';

describe('isPandigitalExpression', () => {
  it.each([
    [2, 3, false],
    [39, 186, true],
  ])(
    'should determine if the expression %d * %d = XXX is pandigital',
    (multiplicand: number, multiplier: number, expected: boolean) => {
      expect(isPandigitalExpression(multiplicand, multiplier)).toBe(expected);
    },
  );
});
