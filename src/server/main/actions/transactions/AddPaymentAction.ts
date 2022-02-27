
import { Transaction } from "../../domain/transactions/Transaction";
import { TransactionRepository } from "../../domain/transactions/TransactionRepository";

export class AddPaymentAction {
    private transactionRepository: TransactionRepository;

    constructor(transactionRepository: TransactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    execute(data: ActionData): Transaction {
        const transaction: Transaction = {
            mount: Math.abs(data.mount) * (-1),
            description: data.description,
            date: new Date()
        }

        this.transactionRepository.add(transaction);

        return transaction;
    }
}

interface ActionData {
    mount: number;
    description: string;
}