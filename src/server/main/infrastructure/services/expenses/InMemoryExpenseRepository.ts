import { Expense } from "../../../domain/expenses/Expense";
import { ExpenseRepository } from "../../../domain/expenses/ExpenseRepository";

export class InMemoryExpenseRepository implements ExpenseRepository {

  private expenses: Expense[];

  constructor() {
    this.expenses = [];
  }

  public getAll(): Promise<Expense[]> {
    return Promise.resolve(this.expenses);
  }

  async markAsPaid(id: number, transactionId: number): Promise<Expense> {
    const expense = await this.getById(id);
    expense.paid = true;
    expense.transactionId = transactionId;
    expense.paymentDate = new Date();
    return Promise.resolve(expense);
  }

  getById(id: number): Promise<Expense> {
    return Promise.resolve(this.expenses.find(exp => exp.id === id));
  }

  getUnpaidByApartment(apartmentId: number): Promise<Expense[]> {
    return Promise.resolve(this.expenses.filter(exp => exp.apartmentId === apartmentId && exp.paid === false));
  }

  getExpense(apartmentId: number, year: number, month: number): Promise<Expense> {
    return Promise.resolve(this.expenses.find(e =>
      e.apartmentId === apartmentId &&
      e.year === year &&
      e.month === month
    ));
  }

  add(expense: Expense): Promise<Expense> {
    expense.createdDate = new Date();
    expense.id = this.expenses.length;
    this.expenses.push(expense);
    return Promise.resolve(expense);
  }

}