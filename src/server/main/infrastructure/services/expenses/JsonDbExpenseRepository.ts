import { Expense } from "../../../domain/expenses/Expense";
import { ExpenseRepository } from "../../../domain/expenses/ExpenseRepository";
import { JsonDb } from "../../db/JsonDb";

export class JsonDbExpenseRepository implements ExpenseRepository {

    private db: JsonDb;

    constructor() {
        this.db = new JsonDb();
    }

    markAsPaid(id: number, transactionId: number): Expense {
        const expenses = this.db.get<Expense>("expenses");
        const expense = expenses.find(exp => exp.id === id);
        if (expense) {
            expense.paid = true;
            expense.transactionId = transactionId;
            expense.paymentDate = new Date();

            this.db.set("expenses", expenses);
            return expense;
        }
    }

    getById(id: number): Expense {
        const expenses = this.db.get<Expense>("expenses");
        return expenses.find(exp => exp.id === id);
    }
    getUnpaidByApartment(apartmentId: number): Expense[] {
        const expenses = this.db.get<Expense>("expenses");
        return expenses.filter(exp => exp.apartmentId === apartmentId && exp.paid === false);
    }

    getExpense(apartmentId: number, year: number, month: number): Expense | undefined {
        const expenses = this.db.get<Expense>("expenses");
        return expenses.find(e =>
            e.apartmentId === apartmentId &&
            e.year === year &&
            e.month === month
        );
    }

    add(expense: Expense): Expense {
        const expenses = this.db.get<Expense>("expenses");

        expense.createdDate = new Date();
        expense.id = expenses.length;
        expenses.push(expense);

        this.db.set("expenses", expenses);
        return expense
    }

}