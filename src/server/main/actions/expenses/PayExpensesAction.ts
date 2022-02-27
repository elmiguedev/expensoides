import { Expense } from "../../domain/expenses/Expense";
import { ExpenseRepository } from "../../domain/expenses/ExpenseRepository";
import { AddEarningAction } from "../transactions/AddEarningAction";

export class PayExpensesAction {

    private expenseRepository: ExpenseRepository;
    private addPaymentAction: AddEarningAction;

    constructor(expenseRepository: ExpenseRepository, addPaymentAction: AddEarningAction) {
        this.expenseRepository = expenseRepository;
        this.addPaymentAction = addPaymentAction;
    }

    public execute(data: ActionData): Expense {
        const expense = this.expenseRepository.getById(data.id);
        if (expense.paid === true && expense.transactionId >= 0) {
            throw new Error("Expense already paid");
        }

        const transaction = this.addPaymentAction.execute({
            description: `Expenses ${expense.month}/${expense.year} of apartment id: ${expense.apartmentId}`,
            mount: expense.mount
        });

        const paidExpense = this.expenseRepository.markAsPaid(expense.id, transaction.id);
        return paidExpense;
    }
}

interface ActionData {
    id: number;
}