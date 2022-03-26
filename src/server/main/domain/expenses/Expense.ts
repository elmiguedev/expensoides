import { Apartment } from "../apartments/Apartment";
import { ExpenseDetail } from "./ExpenseDetail";

export interface Expense {
  id?: number;
  createdDate?: Date;
  year: number;
  month: number;
  description: string;
  paid: boolean;
  transactionId?: number;
  paymentDate?: Date;
  detail: ExpenseDetail[];
  apartmentId: number;
  apartment?: Apartment;
}