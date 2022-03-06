import { ExpenseDetail } from "./ExpenseDetail";

export interface Expense {
  id?: number;
  createdDate?: Date;
  apartmentId: number;
  year: number;
  month: number;
  description: string;
  paid: boolean;
  transactionId?: number;
  paymentDate?: Date;
  detail: ExpenseDetail[]
}