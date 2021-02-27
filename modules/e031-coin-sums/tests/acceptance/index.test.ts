import { getNumberOfCombinations } from '../../src';

describe('getNumberOfCombinations', () => {
  it('should get the number of combinations for £2', () => {
    expect(getNumberOfCombinations(200)).toBe(73682);
  });
});
