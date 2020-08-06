import Account from "../../../src/bank/domain/services/Account";
import TransactionHistory from "../../../src/bank/domain/services/TransactionHistory";
import Clock from "../../../src/bank/adapters/Clock";
import Store from "../../../src/bank/domain/repositories/TransactionStore";
import LocalTransactionStore from "../../../src/bank/adapters/LocalTransactionStore";
import StatementPrinter from "../../../src/bank/domain/services/StatementPrinter";
import Printer from "../../../src/bank/adapters/Printer";

describe("bank account", () => {
  it("should handle deposits, withdrawals and printing statements", () => {
    const mockPrintLine = jest.fn();
    const mockGetTodayAsString = jest
      .fn()
      .mockReturnValueOnce("10/01/2012")
      .mockReturnValueOnce("13/01/2012")
      .mockReturnValueOnce("14/01/2012");

    const clock: Clock = { getTodayAsString: mockGetTodayAsString };
    const store: Store = new LocalTransactionStore();
    const transactionHistory = new TransactionHistory(clock, store);
    const printer: Printer = { printLine: mockPrintLine };
    const statementPrinter = new StatementPrinter(printer);

    const account = new Account(transactionHistory, statementPrinter);

    account.deposit(1000);
    account.deposit(2000);
    account.withdraw(500);
    account.printStatement();

    expect(mockPrintLine).nthCalledWith(1, "Date       || Amount || Balance");
    expect(mockPrintLine).nthCalledWith(2, "14/01/2012 || -500   || 2500");
    expect(mockPrintLine).nthCalledWith(3, "13/01/2012 || 2000   || 3000");
    expect(mockPrintLine).nthCalledWith(4, "10/01/2012 || 1000   || 1000");
  });
});
