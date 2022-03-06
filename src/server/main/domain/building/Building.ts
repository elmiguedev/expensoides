import { ExpenseDetail } from "../expenses/ExpenseDetail";

export interface Building {
  id: number;
  name: string;
  address: string;
  cuit: string;
  admin: string;
  expenses: ExpenseDetail[]
}