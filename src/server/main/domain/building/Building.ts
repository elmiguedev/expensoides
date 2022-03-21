import { Apartment } from "../apartments/Apartment";
import { ExpenseDetail } from "../expenses/ExpenseDetail";
import { Transaction } from "../transactions/Transaction";

export interface Building {
  id: number;
  name: string;
  address: string;
  cuit: string;
  admin: string;
  expenses: ExpenseDetail[];
  transactions?: Transaction[];
  apartments?: Apartment[];
}