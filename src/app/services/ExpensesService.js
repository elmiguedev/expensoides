import { ApiClient } from "./ApiClient";

export class ExpensesService {

  static async generateAllExpenses() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const buildingId = 1;

    const response = await ApiClient.post("/api/expenses/generate/all", {
      buildingId: buildingId,
      year: year,
      month: month
    });

    return response.data;
  }

  static async getUnpaidExpensesByApartment(apartmentId) {
    const response = await ApiClient.get(`/api/apartments/${apartmentId}/expenses/unpaid`);
    return response.data;
  }

  static async payExpenses(expenseId) {
    console.log("EL IDE", expenseId)
    const response = await ApiClient.post(`/api/expenses/pay`, {
      expenseId: expenseId
    });
    return response.data;
  }

  static async getAll() {
    const response = await ApiClient.get(`/api/expenses`);
    return response.data;
  }

  static async generateGenericExpense(expense) {
    const response = await ApiClient.post("/api/expenses/generate/generic", expense);
    return response.data;
  }

}