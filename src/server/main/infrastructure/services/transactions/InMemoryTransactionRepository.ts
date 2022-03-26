import { Transaction } from "../../../domain/transactions/Transaction";
import { TransactionRepository } from "../../../domain/transactions/TransactionRepository";
import { InMemoryDb } from "../../db/InMemoryDb";

export class InMemoryTransactionRepository implements TransactionRepository {

    getByPeriod(month: number, year: number): Promise<Transaction[]> {
        const transactions = InMemoryDb.getInstance().transactions.filter(t => t.date.getFullYear() === year && t.date.getMonth() + 1 === month);
        return Promise.resolve(transactions);
    }

    getById(id: number): Promise<Transaction> {
        return Promise.resolve(InMemoryDb.getInstance().transactions.find(t => t.id === id))
    }

    getAll(): Promise<Transaction[]> {
        return Promise.resolve(InMemoryDb.getInstance().transactions);
    }

    getBalance(): Promise<number> {
        const balance = InMemoryDb.getInstance().transactions
            .map(t => t.mount)
            .reduce((prev, next) => prev + next, 0);
        return Promise.resolve(balance);
    }

    add(transaction: Transaction): Promise<Transaction> {
        transaction.id = InMemoryDb.getInstance().transactions.length;
        InMemoryDb.getInstance().transactions.push(transaction);
        return Promise.resolve(transaction);
    }

}