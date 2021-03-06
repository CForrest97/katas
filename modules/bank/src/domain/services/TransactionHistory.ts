import Clock from '../../adapters/Clock';
import Store from '../repositories/TransactionStore';
import Transaction from '../models/Transaction';

export default class TransactionHistory {
  constructor(private clock: Clock, private store: Store) {}

  public addDeposit(amount: number): void {
    this.store.addTransaction({ amount, date: this.clock.getTodayAsString() });
  }

  public addWithdrawal(amount: number): void {
    this.store.addTransaction({ amount: -amount, date: this.clock.getTodayAsString() });
  }

  public getAllTransactions(): Transaction[] {
    return this.store.pullTransactions();
  }
}
