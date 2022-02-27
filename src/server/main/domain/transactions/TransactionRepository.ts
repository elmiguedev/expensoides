import { Transaction } from "./Transaction";

export interface TransactionRepository {
    add(transaction: Transaction);
    getBalance(): number;
    getAll(): Transaction[];
    getById(id: number): Transaction;
}