export const isPandigitalExpression = (multiplicand: number, multiplier: number): boolean => {
  const s = `${multiplicand}${multiplier}${multiplicand * multiplier}`;

  return s.length === 9
    && s.includes('1')
    && s.includes('2')
    && s.includes('3')
    && s.includes('4')
    && s.includes('5')
    && s.includes('6')
    && s.includes('7')
    && s.includes('8')
    && s.includes('9');
};

export const getNumberOfPandigitalProducts = (): number => {
  const products = new Set<number>();

  for (let i = 1; i < 100; i += 1) {
    for (let j = Math.max(i + 1, Math.floor(1000 / i)); j < 10000 / i; j += 1) {
      if (isPandigitalExpression(i, j)) {
        products.add(i * j);
      }
    }
  }

  let subtotal = 0;
  products.forEach((v) => { subtotal += v; });

  return subtotal;
};
