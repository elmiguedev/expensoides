import { TransactionRepository } from "../../domain/transactions/TransactionRepository";

export class GetBalanceAction {
    private transactionRepository: TransactionRepository;
    constructor(transactionRepository: TransactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public execute(): Promise<number> {
        return this.transactionRepository.getBalance();
    }
}