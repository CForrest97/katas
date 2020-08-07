import Account from "../../../../src/domain/services/Account";
import TransactionHistory from "../../../../src/domain/services/TransactionHistory";
import StatementPrinter from "../../../../src/domain/services/StatementPrinter";
import Clock from "../../../../src/adapters/Clock";
import Store from "../../../../src/domain/repositories/TransactionStore";
import Printer from "../../../../src/adapters/Printer";

jest.mock("../../../../src/domain/services/TransactionHistory.ts");
jest.mock("../../../../src/domain/services/StatementPrinter.ts");

const mockAddDeposit = jest.fn();
const mockAddWithdrawal = jest.fn();
const mockGetAllTransactions = jest.fn();
const mockPrint = jest.fn();

(TransactionHistory as jest.Mock).mockReturnValue({
  addDeposit: mockAddDeposit,
  addWithdrawal: mockAddWithdrawal,
  getAllTransactions: mockGetAllTransactions,
});

(StatementPrinter as jest.Mock).mockReturnValue({
  print: mockPrint,
});

describe("Account", () => {
  let account: Account;

  beforeEach(() => {
    const clock: Clock = { getTodayAsString: jest.fn() };
    const store: Store = { addTransaction: jest.fn(), pullTransactions: jest.fn() };
    const printer: Printer = { printLine: jest.fn() };

    const transactionHistory = new TransactionHistory(clock, store);
    const statementPrinter = new StatementPrinter(printer);

    account = new Account(transactionHistory, statementPrinter);
  });

  it("should add a deposit to the transactionHistory", () => {
    account.deposit(100);

    expect(mockAddDeposit).toHaveBeenCalledWith(100);
  });
  it("should add a withdrawal to the transactionHistory", () => {
    account.withdraw(100);

    expect(mockAddWithdrawal).toHaveBeenCalledWith(100);
  });
  it("should print a statement with all transactions", () => {
    mockGetAllTransactions.mockReturnValue([
      { amount: 100, date: "10/10/12" },
      { amount: -100, date: "11/10/12" },
    ]);

    account.printStatement();

    expect(mockPrint).toHaveBeenCalledWith([
      { amount: 100, date: "10/10/12" },
      { amount: -100, date: "11/10/12" },
    ]);
  });
});
