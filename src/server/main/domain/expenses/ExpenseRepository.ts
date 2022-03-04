import { Expense } from "./Expense";

export interface ExpenseRepository {
  getExpense(apartmentId: number, year: number, month: number): Promise<Expense>;
  add(expense: Expense): Promise<Expense>;
  getAll(): Promise<Expense[]>;
  getUnpaidByApartment(apartmentId: number): Promise<Expense[]>;
  getById(id: number): Promise<Expense>;
  markAsPaid(id: number, transactionId: number): Promise<Expense>;
}