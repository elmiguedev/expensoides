import { ExpenseDetail } from "../expenses/ExpenseDetail";

export interface ExpenseReportData {
    expenseId: string;
    building: string;
    cuit: string;
    period: string;
    owner: string;
    apartment: string;
    month: string;
    address: string;
    totalMount: number;
    totalMountDescription: string;
    currentDate: string;
    paymentType: string;
    year: string;
    detail: ExpenseDetail[];
}