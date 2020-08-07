import Store from "../domain/repositories/TransactionStore";
import Transaction from "../domain/models/Transaction";

export default class LocalTransactionStore implements Store {
  private transactions: Transaction[] = [];

  addTransaction(transaction: Transaction): void {
    this.transactions.push(transaction);
  }

  pullTransactions(): Transaction[] {
    return this.transactions;
  }
}
