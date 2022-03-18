import { Request, Response } from "express";
import { GenerateExpensesReportAction } from "../../actions/reports/GenerateExpensesReportAction";
import { GenerateGenericExpenseReportAction } from "../../actions/reports/GenerateGenericExpenseReport";
import { GenerateMonthReportAction } from "../../actions/reports/GenerateMonthReportAction";
import { ExpenseReportData } from "../../domain/report/ExpenseReportData";
import fs from "fs";

export class ReportHandler {
  private generateExpensesReportAction: GenerateExpensesReportAction;
  private generateGenericExpenseReportAction: GenerateGenericExpenseReportAction
  private generateMonthReportAction: GenerateMonthReportAction

  constructor(
    generateExpensesReportAction: GenerateExpensesReportAction,
    generateGenericExpenseReportAction: GenerateGenericExpenseReportAction,
    generateMonthReportAction: GenerateMonthReportAction
  ) {
    this.generateExpensesReportAction = generateExpensesReportAction;
    this.generateGenericExpenseReportAction = generateGenericExpenseReportAction;
    this.generateMonthReportAction = generateMonthReportAction;
  }

  public async generateExpenseReport(req: Request, res: Response) {
    const expenseId = req.body.expenseId;
    const path = await this.generateExpensesReportAction.execute({ expenseId });
    res.download(path, "Expenses.pdf", (err) => {
      if (err) {
        console.log(err);
      }
      fs.unlink(path, () => {
        console.log("deleted");
      });
    });
  }

  public async generateGenericExpenseReport(req: Request, res: Response) {
    const reportData = req.body;
    const path = await this.generateGenericExpenseReportAction.execute(reportData);
    res.download(path, "Expenses.pdf", (err) => {
      if (err) {
        console.log(err);
      }
      fs.unlink(path, () => {
        console.log("deleted");
      });
    });
  }

  public async generateMonthReport(req: Request, res: Response) {
    const reportData = req.body;
    const path = await this.generateMonthReportAction.execute(reportData);
    res.download(path, "MonthReport.pdf", (err) => {
      if (err) {
        console.log(err);
      }
      fs.unlink(path, () => {
        console.log("deleted");
      });
    });
  }


}