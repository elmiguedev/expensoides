import { Expense } from "../../domain/expenses/Expense";
import { ExpenseRepository } from "../../domain/expenses/ExpenseRepository";
import { Transaction } from "../../domain/transactions/Transaction";
import { TransactionRepository } from "../../domain/transactions/TransactionRepository";
import { AddEarningAction } from "../transactions/AddEarningAction";

export class PayExpensesAction {

    private expenseRepository: ExpenseRepository;
    private transactionRepository: TransactionRepository;

    constructor(expenseRepository: ExpenseRepository, transactionRepository: TransactionRepository) {
        this.expenseRepository = expenseRepository;
        this.transactionRepository = transactionRepository;
    }

    public async execute(data: ActionData): Promise<Expense> {
        const expense = await this.expenseRepository.getById(data.id);

        if (expense.paid === true && expense.transactionId >= 0) {
            throw new Error("Expense already paid");
        }

        const transaction: Transaction = {
            mount: Math.abs(expense.mount),
            description: `Expenses ${expense.month}/${expense.year} of apartment id: ${expense.apartmentId}`,
            date: new Date()
        }

        await this.transactionRepository.add(transaction);
        const paidExpense = await this.expenseRepository.markAsPaid(expense.id, transaction.id);
        return paidExpense;
    }
}

interface ActionData {
    id: number;
}