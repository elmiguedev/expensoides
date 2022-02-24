
import Transaction from "../../domain/transactions/Transaction";
import TransactionRepository from "../../domain/transactions/TransactionRepository";

export default class AddPaymentAction {
    private transactionRepository: TransactionRepository;

    constructor(transactionRepository: TransactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    execute(data: ActionData): Transaction {
        const transaction:Transaction = {
            apartmentId: data.apartmentId,
            mount: Math.abs(data.mount) * (-1),
            description: data.description,
            date: new Date()
        }

        this.transactionRepository.add(transaction);

        return transaction;
    }
}

interface ActionData {
    apartmentId: number;
    mount: number;
    description: string;
}