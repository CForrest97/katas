import Transaction from "../models/Transaction";

export default interface Store {
  addTransaction(transaction: Transaction): void;

  pullTransactions(): Transaction[];
}
