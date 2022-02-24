import Transaction from "./Transaction";

export default interface TransactionRepository {
    add(transaction: Transaction);
    getBalance(): number;
    getAll(): Transaction[];
}