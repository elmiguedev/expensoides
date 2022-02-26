import axios from "axios";

export class ExpensesService {

  static async generateAllExpenses() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    console.log(year, month);
  }

}