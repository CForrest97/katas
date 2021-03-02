import { getNumberOfPandigitalProducts } from '../../src';

describe('getNumberOfCombinations', () => {
  it('should get the number of pandigital products 1-9', () => {
    expect(getNumberOfPandigitalProducts()).toBe(45228);
  });
});
