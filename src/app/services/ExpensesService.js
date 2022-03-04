import axios from "axios";

export class ExpensesService {

  static async generateAllExpenses() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;

    const response = await axios.post("/api/expenses/generate/all", {
      year: year,
      month: month
    });

    return response.data;
  }

  static async getUnpaidExpensesByApartment(apartmentId) {
    const response = await axios.get(`/api/apartments/${apartmentId}/expenses/unpaid`);
    return response.data;
  }

  static async payExpenses(expenseId) {
    const response = await axios.post(`/api/expenses/pay`, {
      expenseId: expenseId
    });
    return response.data;
  }

  static async getAll() {
    const response = await axios.get(`/api/expenses`);
    return response.data;
  }

}