import { Transaction } from "../../../domain/transactions/Transaction";
import { TransactionRepository } from "../../../domain/transactions/TransactionRepository";

export class InMemoryTransactionRepository implements TransactionRepository {
    private transactions: Array<Transaction>;
    constructor() {
        this.transactions = new Array();
    }
    getByPeriod(month: number, year: number): Promise<Transaction[]> {
        const transactions = this.transactions.filter(t => t.date.getFullYear() === year && t.date.getMonth() + 1 === month);
        return Promise.resolve(transactions);
    }

    getById(id: number): Promise<Transaction> {
        return Promise.resolve(this.transactions.find(t => t.id === id))
    }

    getAll(): Promise<Transaction[]> {
        return Promise.resolve(this.transactions);
    }

    getBalance(): Promise<number> {
        const balance = this.transactions
            .map(t => t.mount)
            .reduce((prev, next) => prev + next, 0);
        return Promise.resolve(balance);
    }

    add(transaction: Transaction): Promise<Transaction> {
        transaction.id = this.transactions.length;
        this.transactions.push(transaction);
        return Promise.resolve(transaction);
    }

}