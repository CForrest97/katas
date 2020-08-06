const isDivisibleBy = (n: number, factor: number): boolean => n % factor === 0;

export const isLeapYear = (year: number): boolean =>
  (isDivisibleBy(year, 4) && !isDivisibleBy(year, 100)) || isDivisibleBy(year, 400);
