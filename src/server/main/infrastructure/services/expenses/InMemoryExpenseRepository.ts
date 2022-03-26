import { Expense } from "../../../domain/expenses/Expense";
import { ExpenseRepository } from "../../../domain/expenses/ExpenseRepository";
import { InMemoryDb } from "../../db/InMemoryDb";

export class InMemoryExpenseRepository implements ExpenseRepository {

  public getByPeriod(month: number, year: number): Promise<Expense[]> {
    const result = InMemoryDb.getInstance().expenses.filter(expense => expense.year === year && expense.month === month);
    return Promise.resolve(result);
  }

  public getAll(): Promise<Expense[]> {
    return Promise.resolve(InMemoryDb.getInstance().expenses);
  }

  async markAsPaid(id: number, transactionId: number): Promise<Expense> {
    const expense = await this.getById(id);
    expense.paid = true;
    expense.transactionId = transactionId;
    expense.paymentDate = new Date();
    return Promise.resolve(expense);
  }

  getById(id: number): Promise<Expense> {
    const expense = InMemoryDb.getInstance().expenses.find(exp => exp.id === id);
    expense.apartment = InMemoryDb.getInstance().apartments.find(a => a.id == expense.apartmentId);
    return Promise.resolve(expense);
  }

  getUnpaidByApartment(apartmentId: number): Promise<Expense[]> {
    return Promise.resolve(InMemoryDb.getInstance().expenses.filter(exp => exp.apartmentId === apartmentId && exp.paid === false));
  }

  getExpense(apartmentId: number, year: number, month: number): Promise<Expense> {
    return Promise.resolve(InMemoryDb.getInstance().expenses.find(e =>
      e.apartmentId === apartmentId &&
      e.year === year &&
      e.month === month
    ));
  }

  add(expense: Expense): Promise<Expense> {
    expense.createdDate = new Date();
    expense.id = InMemoryDb.getInstance().expenses.length;
    InMemoryDb.getInstance().expenses.push(expense);
    return Promise.resolve(expense);
  }

}