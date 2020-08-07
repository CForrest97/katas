import { isLeapYear } from "../src";

describe("calculator", () => {
  it.each([
    [2001, false],
    [2004, true],
    [2100, false],
    [2000, true],
  ])("should convert '%s' to %s", (year: number, expectedIsLeapYear: boolean) => {
    expect(isLeapYear(year)).toBe(expectedIsLeapYear);
  });
});
