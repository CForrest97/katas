import StatementPrinter from "../../../../../src/bank/domain/services/StatementPrinter";
import Printer from "../../../../../src/bank/adapters/Printer";

describe("StatementPrinter", () => {
  it("should print an empty statement", () => {
    const mockPrintLine = jest.fn();
    const printer: Printer = { printLine: mockPrintLine };
    const statementPrinter = new StatementPrinter(printer);

    statementPrinter.print([]);

    expect(mockPrintLine).nthCalledWith(1, "Date       || Amount || Balance");
  });
  it("should print a statement with a single transaction", () => {
    const mockPrintLine = jest.fn();
    const printer: Printer = { printLine: mockPrintLine };
    const statementPrinter = new StatementPrinter(printer);

    statementPrinter.print([{ amount: 1000, date: "10/10/2012" }]);

    expect(mockPrintLine).nthCalledWith(1, "Date       || Amount || Balance");
    expect(mockPrintLine).nthCalledWith(2, "10/10/2012 || 1000   || 1000");
  });
  it("should print a statement with multiple transactions in reverse order", () => {
    const mockPrintLine = jest.fn();
    const printer: Printer = { printLine: mockPrintLine };
    const statementPrinter = new StatementPrinter(printer);

    statementPrinter.print([
      { amount: 1000, date: "10/10/2012" },
      { amount: -100, date: "11/10/2012" },
    ]);

    expect(mockPrintLine).nthCalledWith(1, "Date       || Amount || Balance");
    expect(mockPrintLine).nthCalledWith(2, "11/10/2012 || -100   || 900");
    expect(mockPrintLine).nthCalledWith(3, "10/10/2012 || 1000   || 1000");
  });
});
