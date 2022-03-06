import { ApartmentRepository } from "../../domain/apartments/ApartmentRepository";
import { ExpenseRepository } from "../../domain/expenses/ExpenseRepository";
import { ExpenseReportData } from "../../domain/report/ExpenseReportData";
import { ReportService } from "../../domain/report/ReportService";

export class GenerateExpensesReportAction {
    private expenseRepository: ExpenseRepository;
    private apartmentRepository: ApartmentRepository;
    private reportService: ReportService;

    constructor(expenseRepository: ExpenseRepository, apartmentRepository: ApartmentRepository, reportService: ReportService) {
        this.expenseRepository = expenseRepository;
        this.apartmentRepository = apartmentRepository;
        this.reportService = reportService;
    }

    public async execute(data: ActionData): Promise<string> {
        console.log("ARRANCA");
        const expense = await this.expenseRepository.getById(data.expenseId);
        if (!expense) {
            throw new Error("Expense does not exists");
        }

        console.log("LA EXPENSE", expense);

        if (expense.paid === false) {
            throw new Error("Expense is not paid");
        }

        const apartment = await this.apartmentRepository.getById(expense.apartmentId);
        console.log("EL APARTMENT", apartment);
        if (!apartment) {
            throw new Error("Expense has an invalid apartment ID");
        }

        const reportData: ExpenseReportData = {
            expenseId: expense.id,
            apartment: `${apartment.number}`,
            month: `${expense.month}`,
            year: `${expense.year}`,
            mount: expense.mount,
            mountDescription: `${expense.mount}`,
            owner: `${apartment.owner}`,
            currentDate: `${new Date().toDateString()}`
        }

        console.log("LA PREPORT DATA", reportData);

        const filePath = await this.reportService.generateExpenseReport(reportData);

        console.log("EL FILE PATH");

        return filePath;
    }



}

interface ActionData {
    expenseId: number;
}