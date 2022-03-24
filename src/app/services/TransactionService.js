import { ApiClient } from "./ApiClient";

export class TransactionService {
  constructor() {
  }

  static async addPayment(transaction) {
    const response = await ApiClient.post("/api/transactions/payment", transaction);
    return response.data;
  }

  static async addEarning(transaction) {
    const response = await ApiClient.post("/api/transactions/earning", transaction);
    return response.data;
  }

  static async getBalance() {
    const response = await ApiClient.get("/api/transactions/balance");
    return response.data;
  }

  static async getAll() {
    const response = await ApiClient.get("/api/transactions");
    return response.data;
  }

}