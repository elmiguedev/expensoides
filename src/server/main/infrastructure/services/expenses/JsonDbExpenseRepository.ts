import { Expense } from "../../../domain/expenses/Expense";
import { ExpenseRepository } from "../../../domain/expenses/ExpenseRepository";
import { JsonDb } from "../../db/JsonDb";

export class JsonDbExpenseRepository implements ExpenseRepository {

    private db: JsonDb;

    constructor() {
        this.db = new JsonDb();
    }

    markAsPaid(id: number, transactionId: number): Promise<Expense> {
        const expenses = this.db.get<Expense>("expenses");
        const expense = expenses.find(exp => exp.id === id);
        if (expense) {
            expense.paid = true;
            expense.transactionId = transactionId;
            expense.paymentDate = new Date();

            this.db.set("expenses", expenses);
            return Promise.resolve(expense);
        }
    }

    getById(id: number): Promise<Expense> {
        const expenses = this.db.get<Expense>("expenses");
        const expense = expenses.find(exp => exp.id === id);
        return Promise.resolve(expense);
    }
    getUnpaidByApartment(apartmentId: number): Promise<Expense[]> {
        const expenses = this.db.get<Expense>("expenses");
        const unpaid = expenses.filter(exp => exp.apartmentId === apartmentId && exp.paid === false);
        return Promise.resolve(unpaid);
    }

    getExpense(apartmentId: number, year: number, month: number): Promise<Expense> {
        const expenses = this.db.get<Expense>("expenses");
        const expense =  expenses.find(e =>
            e.apartmentId === apartmentId &&
            e.year === year &&
            e.month === month
        );
        return Promise.resolve(expense);
    }

    add(expense: Expense): Promise<Expense> {
        const expenses = this.db.get<Expense>("expenses");

        expense.createdDate = new Date();
        expense.id = expenses.length;
        expenses.push(expense);

        this.db.set("expenses", expenses);
        return Promise.resolve(expense);
    }

}