import Account from "../../../../../src/bank/domain/services/Account";
import TransactionHistory from "../../../../../src/bank/domain/services/TransactionHistory";
import StatementPrinter from "../../../../../src/bank/domain/services/StatementPrinter";
import Clock from "../../../../../src/bank/adapters/Clock";
import Store from "../../../../../src/bank/domain/repositories/TransactionStore";
import Printer from "../../../../../src/bank/adapters/Printer";

jest.mock("../../../../../src/bank/domain/services/TransactionHistory.ts");
jest.mock("../../../../../src/bank/domain/services/StatementPrinter.ts");

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
