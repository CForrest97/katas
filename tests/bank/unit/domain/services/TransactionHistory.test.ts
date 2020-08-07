import TransactionHistory from "../../../../../src/bank/domain/services/TransactionHistory";
import Clock from "../../../../../src/bank/adapters/Clock";
import Store from "../../../../../src/bank/domain/repositories/TransactionStore";

const mockAddTransaction = jest.fn();
const mockPullTransaction = jest.fn();

describe("TransactionHistory", () => {
  let transactionHistory: TransactionHistory;

  beforeEach(() => {
    const store: Store = { addTransaction: mockAddTransaction, pullTransactions: mockPullTransaction };
    const clock: Clock = { getTodayAsString: jest.fn().mockReturnValue("10/01/2012") };
    transactionHistory = new TransactionHistory(clock, store);
  });
  it("should store a DEPOSIT transaction in a store", () => {
    transactionHistory.addDeposit(100);

    expect(mockAddTransaction).toHaveBeenCalledWith({ amount: 100, date: "10/01/2012" });
  });
  it("should store a WITHDRAWAL transaction in a store", () => {
    transactionHistory.addWithdrawal(100);

    expect(mockAddTransaction).toHaveBeenCalledWith({ amount: -100, date: "10/01/2012" });
  });
  it("should pull all transactions from the store", () => {
    mockPullTransaction.mockReturnValue([
      { amount: 100, date: "10/10/12" },
      { amount: -100, date: "11/10/12" },
    ]);

    const transactions = transactionHistory.getAllTransactions();

    expect(transactions).toEqual([
      { amount: 100, date: "10/10/12" },
      { amount: -100, date: "11/10/12" },
    ]);
  });
});
