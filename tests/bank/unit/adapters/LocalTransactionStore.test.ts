import LocalTransactionStore from "../../../../src/bank/adapters/LocalTransactionStore";

describe("LocalTransactionStore", () => {
  it("should store and pull all transaction", () => {
    const store = new LocalTransactionStore();

    store.addTransaction({ amount: 100, date: "10/01/2012" });
    store.addTransaction({ amount: -100, date: "11/01/2012" });
    const transactions = store.pullTransactions();

    expect(transactions).toEqual([
      { amount: 100, date: "10/01/2012" },
      { amount: -100, date: "11/01/2012" },
    ]);
  });
});
