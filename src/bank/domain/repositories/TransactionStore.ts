import Transaction from "../models/Transaction";

export default interface Store {
  addData(data: Transaction): void;

  pullData(): Transaction[];
}
