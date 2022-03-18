import express, { Request, Response } from "express";
import path from "path";

import { AddApartmentAction } from "../actions/apartments/AddApartmentAction";
import { ListApartmentsAction } from "../actions/apartments/ListApartmentsAction";
import { GenerateAllExpensesAction } from "../actions/expenses/GenerateAllExpensesAction";
import { GenerateExpensesAction } from "../actions/expenses/GenerateExpensesAction";
import { GenerateGenericExpenseAction } from "../actions/expenses/GenerateGenericExpenseAction";
import { GetAllExpensesAction } from "../actions/expenses/GetAllExpensesAction";
import { GetUnpaidExpensesAction } from "../actions/expenses/GetUnpaidExpensesAction";
import { PayExpensesAction } from "../actions/expenses/PayExpensesAction";
import { GenerateExpensesReportAction } from "../actions/reports/GenerateExpensesReportAction";
import { GenerateGenericExpenseReportAction } from "../actions/reports/GenerateGenericExpenseReport";
import { GenerateMonthReportAction } from "../actions/reports/GenerateMonthReportAction";
import { AddEarningAction } from "../actions/transactions/AddEarningAction";
import { AddPaymentAction } from "../actions/transactions/AddPaymentAction";
import { GetBalanceAction } from "../actions/transactions/GetBalanceAction";
import { GetTransactionsAction } from "../actions/transactions/GetTransactionsAction";
import { ApartmentHandler } from "./handlers/ApartmentHandler";
import { ExpensesHandler } from "./handlers/ExpensesHandler";
import { ReportHandler } from "./handlers/ReportHandler";
import { TransactionHandler } from "./handlers/TransactionHandler";

import { JsonDbApartmentRepository } from "./services/apartments/JsonDbApartmentRepository";
import { JsonDbBuildingRepository } from "./services/building/JsonDbBuildingRepository";
import { JsonDbExpenseRepository } from "./services/expenses/JsonDbExpenseRepository";
import { PdfReportService } from "./services/reports/PdfReportService";
import { JsonDbTransactionRepository } from "./services/transactions/JsonDbTransactionRepository";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/", express.static(path.join(__dirname, "../../public")));

app.get("/ping", (req: Request, res: Response) => {
    res.send("pong pong");
});

const apartmentRepository = new JsonDbApartmentRepository();
const transactionRepository = new JsonDbTransactionRepository();
const expensesRepository = new JsonDbExpenseRepository();
const buildingRepository = new JsonDbBuildingRepository();
const reportService = new PdfReportService();

const addApartmentAction = new AddApartmentAction(apartmentRepository);
const listApartmentsAction = new ListApartmentsAction(apartmentRepository);
const addPaymentAction = new AddPaymentAction(transactionRepository);
const addEarningAction = new AddEarningAction(transactionRepository);
const getBalanceAction = new GetBalanceAction(transactionRepository);
const getTransactionsAction = new GetTransactionsAction(transactionRepository);
const generateExpensesAction = new GenerateExpensesAction(
    expensesRepository,
    buildingRepository,
    apartmentRepository
)
const generateAllExpensesAction = new GenerateAllExpensesAction(
    apartmentRepository,
    expensesRepository,
    buildingRepository
)
const generateGenericExpenseAction = new GenerateGenericExpenseAction(expensesRepository, apartmentRepository);

const getUnpaidExpensesAction = new GetUnpaidExpensesAction(expensesRepository);
const payExpensesAction = new PayExpensesAction(expensesRepository, transactionRepository);
const getAllExpensesAction = new GetAllExpensesAction(expensesRepository);

const generateExpenseReportAction = new GenerateExpensesReportAction(
    expensesRepository,
    apartmentRepository,
    buildingRepository,
    reportService
);
const generateGenericExpenseReportAction = new GenerateGenericExpenseReportAction(
    reportService
);
const generateMonthReportAction = new GenerateMonthReportAction(
    reportService,
    transactionRepository,
    expensesRepository,
    apartmentRepository,
    buildingRepository
)

const apartmentHandler = new ApartmentHandler(
    addApartmentAction,
    listApartmentsAction
);

const transactionHandler = new TransactionHandler(
    addPaymentAction,
    addEarningAction,
    getBalanceAction,
    getTransactionsAction
);

const expensesHandler = new ExpensesHandler(
    generateExpensesAction,
    generateAllExpensesAction,
    getUnpaidExpensesAction,
    payExpensesAction,
    getAllExpensesAction,
    generateGenericExpenseAction
);

const reportHandler = new ReportHandler(
    generateExpenseReportAction,
    generateGenericExpenseReportAction,
    generateMonthReportAction,
)

app.post("/api/apartments", apartmentHandler.add.bind(apartmentHandler));
app.get("/api/apartments", apartmentHandler.getAll.bind(apartmentHandler));
app.get("/api/apartments/:apartmentId/expenses/unpaid", expensesHandler.getUnpaidExpenses.bind(expensesHandler));

app.get("/api/transactions", transactionHandler.getAll.bind(transactionHandler));
app.post("/api/transactions/payment", transactionHandler.addPayment.bind(transactionHandler));
app.post("/api/transactions/earning", transactionHandler.addEarning.bind(transactionHandler));
app.get("/api/transactions/balance", transactionHandler.getBalance.bind(transactionHandler));

app.post("/api/expenses/generate/generic", expensesHandler.generateGenericExpense.bind(expensesHandler));
app.post("/api/expenses/generate/all", expensesHandler.generateAllExpenses.bind(expensesHandler));
app.post("/api/expenses/generate", expensesHandler.generateExpenses.bind(expensesHandler));
app.post("/api/expenses/pay", expensesHandler.payExpenses.bind(expensesHandler));
app.get("/api/expenses", expensesHandler.getAll.bind(expensesHandler));

app.post("/api/report/expenses/generic", reportHandler.generateGenericExpenseReport.bind(reportHandler));
app.post("/api/report/expenses", reportHandler.generateExpenseReport.bind(reportHandler));
app.post("/api/report/month", reportHandler.generateMonthReport.bind(reportHandler));








app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/index.html"));
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});



