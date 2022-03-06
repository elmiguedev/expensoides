import { ExpenseDetail } from "../expenses/ExpenseDetail";

export interface ExpenseReportData {
    expenseId: number;
    month: string;
    year: string;
    owner: string;
    apartment: string;
    totalMount: number;
    totalMountDescription: string;
    detail: ExpenseDetail[];
    currentDate: string;
}