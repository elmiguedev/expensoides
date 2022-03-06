import { ExpenseReportData } from "./ExpenseReportData";
import { MonthReportData } from "./MonthReportData";

export interface ReportService {
    generateExpenseReport(data: ExpenseReportData): Promise<string>;
    generateMonthReport(data: MonthReportData): Promise<string>;
}