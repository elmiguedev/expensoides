import { Transaction } from "../../../domain/transactions/Transaction";
import { TransactionRepository } from "../../../domain/transactions/TransactionRepository";
import { JsonDb } from "../../db/JsonDb";

export class JsonDbTransactionRepository implements TransactionRepository {

  private db: JsonDb;

  constructor() {
    this.db = new JsonDb();
  }

  getById(id: number): Promise<Transaction> {
    const transactions = this.db.get<Transaction>("transactions");
    const transaction = transactions.find(t => t.id === id);
    return Promise.resolve(transaction);
  }

  getAll(): Promise<Transaction[]> {
    const transactions = this.db.get<Transaction>("transactions");
    return Promise.resolve(transactions);
  }

  add(transaction: Transaction): Promise<Transaction> {
    const transactions = this.db.get<Transaction>("transactions");
    transaction.id = transactions.length;
    transactions.push(transaction);
    this.db.set("transactions", transactions);
    return Promise.resolve(transaction);
  }
  getBalance(): Promise<number> {
    const transactions = this.db.get<Transaction>("transactions");
    const balance = transactions
      .map(t => t.mount)
      .reduce((prev, next) => prev + next, 0);
    return Promise.resolve(balance);
  }

}