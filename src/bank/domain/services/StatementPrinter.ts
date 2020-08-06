import Transaction from "../models/Transaction";
import Printer from "../../adapters/Printer";

export default class StatementPrinter {
  constructor(private printer: Printer) {}

  public print(transactions: Transaction[]): void {
    this.printer.printLine("Date       || Amount || Balance");
    this.printTransactions(transactions);
  }

  private printTransactions(transactions: Transaction[]): void {
    let subtotal = 0;

    transactions
      .map((transaction) => {
        subtotal += transaction.amount;
        return `${transaction.date} || ${transaction.amount}   || ${subtotal}`;
      })
      .reverse()
      .forEach((transactionString) => {
        this.printer.printLine(transactionString);
      });
  }
}
