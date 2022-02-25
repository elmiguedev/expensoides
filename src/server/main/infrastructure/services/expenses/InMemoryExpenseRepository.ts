import Expense from "../../../domain/expenses/Expense";
import ExpenseRepository from "../../../domain/expenses/ExpenseRepository";

export default class InMemoryExpenseRepository implements ExpenseRepository {

  private expenses: Expense[];

  constructor() {
    this.expenses = [];
  }

  getExpense(apartmentId: number, year: number, month: number): Expense {
    return this.expenses.find(e =>
      e.apartmentId === apartmentId &&
      e.year === year &&
      e.month === month
    );
  }

  add(expense: Expense): Expense {
    expense.createdDate = new Date();
    this.expenses.push(expense);
    return expense
  }

}