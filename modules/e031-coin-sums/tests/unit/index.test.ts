import { getNumberOfCombinations } from '../../src';

describe('getNumberOfCombinations', () => {
  it.each([
    [1, 1],
    [2, 2],
    [3, 2],
  ])(
    'Given %d, there should be %d different combinations of change',
    (input: number, expected: number) => {
      expect(getNumberOfCombinations(input)).toBe(expected);
    },
  );
});
