import TransactionHistory from "./TransactionHistory";
import StatementPrinter from "./StatementPrinter";

export default class Account {
  constructor(private transactionHistory: TransactionHistory, private statementPrinter: StatementPrinter) {}

  deposit(amount: number): void {
    this.transactionHistory.addDeposit(amount);
  }

  withdraw(amount: number): void {
    this.transactionHistory.addWithdrawal(amount);
  }

  printStatement(): void {
    this.statementPrinter.print(this.transactionHistory.getAllTransactions());
  }
}
