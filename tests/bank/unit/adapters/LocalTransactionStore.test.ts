import LocalTransactionStore from "../../../../src/bank/adapters/LocalTransactionStore";

describe("LocalTransactionStore", () => {
  it("should store and pull all transaction", () => {
    const store = new LocalTransactionStore();

    store.addData({ amount: 100, date: "10/01/2012" });
    store.addData({ amount: -100, date: "11/01/2012" });
    const transactions = store.pullData();

    expect(transactions).toEqual([
      { amount: 100, date: "10/01/2012" },
      { amount: -100, date: "11/01/2012" },
    ]);
  });
});
