import { TransactionRepository } from "../../domain/transactions/TransactionRepository";

export class GetTransactionsAction {
  private transactionRepository: TransactionRepository;
  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  public execute() {
    return this.transactionRepository.getAll();
  }
}