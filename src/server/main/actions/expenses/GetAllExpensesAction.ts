import { Expense } from "../../domain/expenses/Expense";
import { ExpenseRepository } from "../../domain/expenses/ExpenseRepository";

export class GetAllExpensesAction {
    private expenseRepository:ExpenseRepository;
    constructor(expenseRepository:ExpenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    public execute() : Promise<Expense[]> {
        return this.expenseRepository.getAll();
    }
}