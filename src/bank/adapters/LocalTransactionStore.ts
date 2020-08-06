import Store from "../domain/repositories/TransactionStore";
import Transaction from "../domain/models/Transaction";

export default class LocalTransactionStore implements Store {
  private transactions: Transaction[] = [];

  addData(transaction: Transaction): void {
    this.transactions.push(transaction);
  }

  pullData(): Transaction[] {
    return this.transactions;
  }
}
