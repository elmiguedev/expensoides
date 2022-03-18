import { ExpenseReportData } from "../../../domain/report/ExpenseReportData";
import { MonthReportData } from "../../../domain/report/MonthReportData";
import { ReportService } from "../../../domain/report/ReportService";
import pdf from "pdf-creator-node";
import fs from "fs";
import path from "path";

export class PdfReportService implements ReportService {


    constructor() {


    }

    public async generateExpenseReport(data: ExpenseReportData): Promise<string> {

        const html = this.getExpensesTemplate();
        const documentConfiguration = this.getDocumentConfiguration();
        const filePath = path.join(__dirname, `expenses_${data.expenseId}_${new Date().getMilliseconds()}.pdf`);
        await this.createPdf(html, documentConfiguration, data, filePath);
        return filePath;

    }

    public async generateMonthReport(data: MonthReportData): Promise<string> {
        const html = this.getMonthTemplate();
        const documentConfiguration = this.getDocumentConfiguration();
        const filePath = path.join(__dirname, `month_report_${data.building}_${new Date().getMilliseconds()}.pdf`);
        await this.createPdf(html, documentConfiguration, data, filePath);
        return filePath;
    }

    private getTemplate(path: string): string {
        return fs.readFileSync(path, "utf8");
    }

    private getExpensesTemplate(): string {
        return this.getTemplate(path.join(__dirname, "./templates/expenseReport.html"));
    }

    private getMonthTemplate(): string {
        return this.getTemplate(path.join(__dirname, "./templates/monthReport.html"));
    }

    private getDocumentConfiguration() {
        return {
            format: "A4",
            orientation: "portrait",
            border: "10mm",

        };
    }

    private async createPdf(html: string, config: any, data: any, filename: string) {
        const document = {
            html: html,
            data: data,
            path: filename,
            type: "",
        };

        try {
            const result = await pdf.create(document, config);
        } catch (error) {
            throw new Error(error);
        }
    }

    public removePdf(path: string) {
        fs.unlinkSync(path)
    }
}