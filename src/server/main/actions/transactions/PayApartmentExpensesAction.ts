import TransactionRepository from "../../domain/transactions/TransactionRepository";

export default class PayApartmentExpensesAction {
    private transactionRepository: TransactionRepository;

    constructor(transactionRepository: TransactionRepository) {
        this.transactionRepository = transactionRepository;
        
    }

    public execute() {
        
    }
}