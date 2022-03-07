import { Expense } from "../../domain/expenses/Expense";
import { ExpenseDetail } from "../../domain/expenses/ExpenseDetail";
import { ExpenseRepository } from "../../domain/expenses/ExpenseRepository";

export class GenerateGenericExpenseAction {
    private expenseRepository: ExpenseRepository;

    constructor(expenseRepository: ExpenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    public async execute(data: ActionData): Promise<Expense> {
        const creationDate = new Date();
        const expense = await this.expenseRepository.add({
            apartmentId: data.apartmentId,
            year: creationDate.getFullYear(),
            month: creationDate.getMonth() + 1,
            description: data.description,
            paid: false,
            detail: data.detail
        });

        return expense;
    }
}

interface ActionData {
    apartmentId: number;
    description: string;
    detail: ExpenseDetail[]
}