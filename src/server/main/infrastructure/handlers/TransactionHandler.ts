import { Response } from "express";
import { Request } from "express";
import { AddPaymentAction } from "../../actions/transactions/AddPaymentAction";
import { AddEarningAction } from "../../actions/transactions/AddEarningAction";
import { GetBalanceAction } from "../../actions/transactions/GetBalanceAction";
import { GetTransactionsAction } from "../../actions/transactions/GetTransactionsAction";

export class TransactionHandler {
  private addPaymentAction: AddPaymentAction;
  private addEarningAction: AddEarningAction;
  private getBalanceAction: GetBalanceAction;
  private getTransactionsAction: GetTransactionsAction;

  constructor(
    addPaymentAction: AddPaymentAction,
    addEarningAction: AddEarningAction,
    getBalanceAction: GetBalanceAction,
    getTransactionsAction: GetTransactionsAction
  ) {
    this.addPaymentAction = addPaymentAction;
    this.addEarningAction = addEarningAction;
    this.getBalanceAction = getBalanceAction;
    this.getTransactionsAction = getTransactionsAction;
  }

  addPayment(req: Request, res: Response) {
    const transactionData = req.body;
    try {
      const transaction = this.addPaymentAction.execute(transactionData);
      res.status(200).json(transaction);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }

  addEarning(req: Request, res: Response) {
    const transactionData = req.body;
    try {
      const transaction = this.addEarningAction.execute(transactionData);
      res.status(200).json(transaction);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }

  getBalance(req: Request, res: Response) {
    try {
      const balance = this.getBalanceAction.execute();
      res.status(200).json(balance);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }

  getAll(req: Request, res: Response) {
    try {
      const transactions = this.getTransactionsAction.execute();
      res.status(200).json(transactions);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }


}