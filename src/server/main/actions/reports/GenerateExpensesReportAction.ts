import { ApartmentRepository } from "../../domain/apartments/ApartmentRepository";
import { BuildingRepository } from "../../domain/building/BuildingRepository";
import { Expense } from "../../domain/expenses/Expense";
import { ExpenseRepository } from "../../domain/expenses/ExpenseRepository";
import { ExpenseReportData } from "../../domain/report/ExpenseReportData";
import { ReportService } from "../../domain/report/ReportService";
import { numeroALetras } from "../../utils/Numbers";

export class GenerateExpensesReportAction {
    private expenseRepository: ExpenseRepository;
    private apartmentRepository: ApartmentRepository;
    private buildingRepository: BuildingRepository;
    private reportService: ReportService;

    constructor(
        expenseRepository: ExpenseRepository,
        apartmentRepository: ApartmentRepository,
        buildingRepository: BuildingRepository,
        reportService: ReportService,
    ) {
        this.expenseRepository = expenseRepository;
        this.apartmentRepository = apartmentRepository;
        this.buildingRepository = buildingRepository;
        this.reportService = reportService;
    }

    public async execute(data: ActionData): Promise<string> {
        const expense = await this.expenseRepository.getById(data.expenseId);
        if (!expense) {
            throw new Error("Expense does not exists");
        }

        if (expense.paid === false) {
            throw new Error("Expense is not paid");
        }

        const apartment = await this.apartmentRepository.getById(expense.apartmentId);

        if (!apartment) {
            throw new Error("Expense has an invalid apartment ID");
        }

        const building = await this.buildingRepository.getById(apartment.buildingId);

        if (!building) {
            throw new Error("Building does not exists");
        }

        const reportData: ExpenseReportData = {
            expenseId: String(data.expenseId).padStart(8, '0'),
            building: building.name,
            cuit: building.cuit,
            period: `${this.getMonth(expense.month)} ${expense.year}`,
            owner: apartment.owner,
            apartment: `${apartment.number}`,
            address: `${building.address}`,
            totalMount: this.getExpenseMount(expense),
            totalMountDescription: numeroALetras(this.getExpenseMount(expense), ""),
            currentDate: this.getDateDescription(expense.paymentDate),
            paymentType: "cash",
            year: `${expense.year}`,
            month: `${expense.month}`,
            detail: expense.detail
        }

        console.log("LA PREPORT DATA", reportData);

        const filePath = await this.reportService.generateExpenseReport(reportData);

        console.log("EL FILE PATH");

        return filePath;
    }

    private getMonth(month: number) {
        const months = {
            1: "Enero",
            2: "Febrero",
            3: "Marzo",
            4: "Abril",
            5: "Mayo",
            6: "Junio",
            7: "Julio",
            8: "Agosto",
            9: "Septiembre",
            10: "Octubre",
            11: "Noviembre",
            12: "Diciembre"
        }
        return months[month];
    }

    private getDateDescription(date: Date) {
        return `${date.getDate()} de ${this.getMonth(date.getMonth() + 1)} de ${date.getFullYear()}`;
    }

    private getExpenseMount(expense: Expense): number {
        let total = 0;
        expense.detail.forEach(detail => {
            total += detail.mount;
        });
        return Math.abs(total);
    }

}

interface ActionData {
    expenseId: number;
}