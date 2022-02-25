import Expense from "./Expense";

export default interface ExpenseRepository {
  getExpense(apartmentId: number, year: number, month: number): Expense;
  add(expense: Expense): Expense;
}