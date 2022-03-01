import { Request, Response } from "express";
import { GenerateExpensesAction } from "../../actions/expenses/GenerateExpensesAction";
import { GenerateAllExpensesAction } from "../../actions/expenses/GenerateAllExpensesAction";
import { GetUnpaidExpensesAction } from "../../actions/expenses/GetUnpaidExpensesAction";
import { PayExpensesAction } from "../../actions/expenses/PayExpensesAction";

export class ExpensesHandler {
    private generateExpensesAction: GenerateExpensesAction;
    private generateAllExpensesAction: GenerateAllExpensesAction;
    private getUnpaidExpensesAction: GetUnpaidExpensesAction;
    private payExpensesAction: PayExpensesAction;

    constructor(
        generateExpensesAction: GenerateExpensesAction,
        generateAllExpensesAction: GenerateAllExpensesAction,
        getUnpaidExpensesAction: GetUnpaidExpensesAction,
        payExpensesAction: PayExpensesAction
    ) {
        this.generateExpensesAction = generateExpensesAction;
        this.generateAllExpensesAction = generateAllExpensesAction;
        this.getUnpaidExpensesAction = getUnpaidExpensesAction;
        this.payExpensesAction = payExpensesAction;
    }

    public generateExpenses(req: Request, res: Response) {
        const expenseData = req.body;
        try {
            const expense = this.generateExpensesAction.execute(expenseData);
            res.status(200).json(expense);
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    }

    public generateAllExpenses(req: Request, res: Response) {
        const expenseData = req.body;
        try {
            const expenses = this.generateAllExpensesAction.execute(expenseData);
            res.status(200).json(expenses);
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    }

    public getUnpaidExpenses(req: Request, res: Response) {
        const apartmentId = +req.params.apartmentId;
        try {
            const expenses = this.getUnpaidExpensesAction.execute({ apartmentId });
            res.status(200).json(expenses);
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    }

    public payExpenses(req: Request, res: Response) {
        const expenseId = +req.body.expenseId;
        try {
            const expense = this.payExpensesAction.execute({ id: expenseId });
            res.status(200).json(expense);
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    }

}