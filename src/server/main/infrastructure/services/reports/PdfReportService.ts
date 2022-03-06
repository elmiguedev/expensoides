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
        const filePath = path.join(__dirname, "expenses.pdf");
        await this.createPdf(html, documentConfiguration, data, filePath);
        return filePath;

    }

    public generateMonthReport(data: MonthReportData): Promise<string> {
        throw new Error("Method not implemented.");
    }

    private getTemplate(path: string): string {
        return fs.readFileSync(path, "utf8");
    }

    private getExpensesTemplate(): string {
        return this.getTemplate(path.join(__dirname, "./templates/expenseReport.html"));
    }

    private getDocumentConfiguration() {
        return {
            format: "A4",
            orientation: "portrait",
            border: "10mm",
            header: {
                height: "45mm",
                contents: '<div style="text-align: center;">Author: Test</div>'
            },
            footer: {
                height: "28mm",
                contents: {
                    first: 'Cover page',
                    2: 'Second page', // Any page number is working. 1-based index
                    default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                    last: 'Last Page'
                }
            }
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