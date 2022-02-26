import GenerateExpensesAction from "../../actions/expenses/GenerateExpensesAction";
import GenerateAllExpensesAction from "../../actions/expenses/GenerateAllExpensesAction";
import { Request, Response } from "express";
import GetUnpaidExpensesAction from "../../actions/expenses/GetUnpaidExpensesAction";

export default class ExpensesHandler {
    private generateExpensesAction: GenerateExpensesAction;
    private generateAllExpensesAction: GenerateAllExpensesAction;
    private getUnpaidExpensesAction: GetUnpaidExpensesAction;

    constructor(
        generateExpensesAction: GenerateExpensesAction,
        generateAllExpensesAction: GenerateAllExpensesAction,
        getUnpaidExpensesAction: GetUnpaidExpensesAction
    ) {
        this.generateExpensesAction = generateExpensesAction;
        this.generateAllExpensesAction = generateAllExpensesAction;
        this.getUnpaidExpensesAction = getUnpaidExpensesAction;
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

}