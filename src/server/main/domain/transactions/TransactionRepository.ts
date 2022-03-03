import { Transaction } from "./Transaction";

export interface TransactionRepository {
    add(transaction: Transaction): Promise<Transaction>;
    getBalance(): Promise<number>;
    getAll(): Promise<Transaction[]>;
    getById(id: number): Promise<Transaction>;
}