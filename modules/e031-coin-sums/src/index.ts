const COINS = [1, 2, 5, 10, 20, 50, 100, 200];

const getNumberOfCombinationsForCoins = (amount: number, remainingCoins: number[]): number => {
  if (remainingCoins.length === 1) {
    return 1;
  }

  const otherCoins = [...remainingCoins];
  const largestCoin = otherCoins.pop() as number;

  const degreesOfFreedomForLargestCoin = Math.floor(amount / largestCoin) + 1;

  return Array
    .from({ length: degreesOfFreedomForLargestCoin })
    .map((_, i) => getNumberOfCombinationsForCoins(amount - (i * largestCoin), otherCoins))
    .reduce((a, b) => a + b);
};

export const getNumberOfCombinations = (amount: number): number => getNumberOfCombinationsForCoins(amount, COINS);
