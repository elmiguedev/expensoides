import Expense from "../../../domain/expenses/Expense";
import ExpenseRepository from "../../../domain/expenses/ExpenseRepository";
import JsonDb from "../../db/JsonDb";

export default class JsonDbExpenseRepository implements ExpenseRepository {

    private db: JsonDb;

    constructor() {
        this.db = new JsonDb();
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