import { Transaction } from "../../../domain/transactions/Transaction";
import { TransactionRepository } from "../../../domain/transactions/TransactionRepository";

export class InMemoryTransactionRepository implements TransactionRepository {
    private transactions: Array<Transaction>;
    constructor() {
        this.transactions = new Array();
    }
    getAll(): Transaction[] {
        return this.transactions;
    }

    getBalance(): number {
        const balance = this.transactions
            .map(t => t.mount)
            .reduce((prev, next) => prev + next, 0);
        return balance;
    }

    add(transaction: Transaction) {
        transaction.id = this.transactions.length;
        this.transactions.push(transaction);
    }

}