import { ApartmentRepository } from "../../domain/apartments/ApartmentRepository";
import { BuildingRepository } from "../../domain/building/BuildingRepository";
import { Expense } from "../../domain/expenses/Expense";
import { ExpenseDetail } from "../../domain/expenses/ExpenseDetail";
import { ExpenseRepository } from "../../domain/expenses/ExpenseRepository";
import { ExpenseReportData } from "../../domain/report/ExpenseReportData";
import { ReportService } from "../../domain/report/ReportService";
import { numeroALetras } from "../../utils/Numbers";

export class GenerateGenericExpenseReportAction {
  private reportService: ReportService;

  constructor(
    reportService: ReportService,
  ) {
    this.reportService = reportService;
  }

  public async execute(data: ActionData): Promise<string> {

    const reportData: ExpenseReportData = {
      expenseId: String(data.expenseId).padStart(8, '0'),
      building: data.building,
      cuit: data.cuit,
      period: `${this.getMonth(data.month)} ${data.year}`,
      owner: data.owner,
      apartment: `${data.apartment}`,
      address: `${data.address}`,
      totalMount: data.total,
      totalMountDescription: numeroALetras(data.total, ""),
      currentDate: this.getDateDescription(data.paymentDate),
      paymentType: data.paymentType,
      year: `${data.year}`,
      month: `${data.month}`,
      detail: data.detail
    }

    const filePath = await this.reportService.generateExpenseReport(reportData);
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
  building: string;
  cuit: string;
  month: number;
  year: number;
  owner: string;
  apartment: string;
  address: string;
  total: number;
  paymentDate: Date;
  paymentType: string;
  detail: ExpenseDetail[];
}