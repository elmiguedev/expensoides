import { Expense } from "../../../domain/expenses/Expense";
import { ExpenseRepository } from "../../../domain/expenses/ExpenseRepository";

export class InMemoryExpenseRepository implements ExpenseRepository {

  private expenses: Expense[];

  constructor() {
    this.expenses = [];
  }

  markAsPaid(id: number, transactionId: number): Expense {
    const expense = this.getById(id);
    expense.paid = true;
    expense.transactionId = transactionId;
    expense.paymentDate = new Date();
    return expense;
  }

  getById(id: number): Expense {
    return this.expenses.find(exp => exp.id === id);
  }

  getUnpaidByApartment(apartmentId: number): Expense[] {
    return this.expenses.filter(exp => exp.apartmentId === apartmentId && exp.paid === false);
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
    expense.id = this.expenses.length;
    this.expenses.push(expense);
    return expense
  }

}