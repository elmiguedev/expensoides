import { Expense } from "./Expense";

export interface ExpenseRepository {
  getExpense(apartmentId: number, year: number, month: number): Expense | undefined;
  add(expense: Expense): Expense;
  getUnpaidByApartment(apartmentId: number): Expense[];
}