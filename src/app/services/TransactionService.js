import axios from "axios";

export class TransactionService {
  constructor() {
  }

  static async addPayment(transaction) {
    const response = await axios.post("/api/transactions/payment", transaction);
    return response.data;
  }

  static async addEarning(transaction) {
    const response = await axios.post("/api/transactions/earning", transaction);
    return response.data;
  }

  static async getBalance() {
    const response = await axios.get("/api/transactions/balance");
    return response.data;
  }

  static async getAll() {
    const response = await axios.get("/api/transactions");
    return response.data;
  }

}