import { Request, Response } from "express";
import { GenerateExpensesAction } from "../../actions/expenses/GenerateExpensesAction";
import { GenerateAllExpensesAction } from "../../actions/expenses/GenerateAllExpensesAction";
import { GetUnpaidExpensesAction } from "../../actions/expenses/GetUnpaidExpensesAction";
import { PayExpensesAction } from "../../actions/expenses/PayExpensesAction";
import { GetAllExpensesAction } from "../../actions/expenses/GetAllExpensesAction";

export class ExpensesHandler {
    private generateExpensesAction: GenerateExpensesAction;
    private generateAllExpensesAction: GenerateAllExpensesAction;
    private getUnpaidExpensesAction: GetUnpaidExpensesAction;
    private payExpensesAction: PayExpensesAction;
    private getAllExpensesAction: GetAllExpensesAction;

    constructor(
        generateExpensesAction: GenerateExpensesAction,
        generateAllExpensesAction: GenerateAllExpensesAction,
        getUnpaidExpensesAction: GetUnpaidExpensesAction,
        payExpensesAction: PayExpensesAction,
        getAllExpensesAction: GetAllExpensesAction
    ) {
        this.generateExpensesAction = generateExpensesAction;
        this.generateAllExpensesAction = generateAllExpensesAction;
        this.getUnpaidExpensesAction = getUnpaidExpensesAction;
        this.payExpensesAction = payExpensesAction;
        this.getAllExpensesAction = getAllExpensesAction;
    }

    public async generateExpenses(req: Request, res: Response) {
        const expenseData = req.body;
        try {
            const expense = await this.generateExpensesAction.execute(expenseData);
            res.status(200).json(expense);
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    }

    public async generateAllExpenses(req: Request, res: Response) {
        const expenseData = req.body;
        try {
            const expenses = await this.generateAllExpensesAction.execute(expenseData);
            res.status(200).json(expenses);
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    }

    public async getUnpaidExpenses(req: Request, res: Response) {
        const apartmentId = +req.params.apartmentId;
        try {
            const expenses = await this.getUnpaidExpensesAction.execute({ apartmentId });
            res.status(200).json(expenses);
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    }

    public async payExpenses(req: Request, res: Response) {
        const expenseId = +req.body.expenseId;
        try {
            const expense = await this.payExpensesAction.execute({ id: expenseId });
            res.status(200).json(expense);
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    }

    public async getAll(req: Request, res: Response) {
        try {
            const expenses = await this.getAllExpensesAction.execute();
            res.status(200).json(expenses);
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    }

}