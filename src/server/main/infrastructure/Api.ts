import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import passport from "passport";
import { PassportMiddleware } from "./middleware/PassportMiddleware";
import { AddPaymentAction } from "../actions/transactions/AddPaymentAction";
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
import { GetBalanceAction } from "../actions/transactions/GetBalanceAction";
import { GetTransactionsAction } from "../actions/transactions/GetTransactionsAction";
import { PostgresConnection } from "./db/PostgresConnection";
import { ApartmentHandler } from "./handlers/ApartmentHandler";
import { ExpensesHandler } from "./handlers/ExpensesHandler";
import { ReportHandler } from "./handlers/ReportHandler";
import { TransactionHandler } from "./handlers/TransactionHandler";
import { PostgresApartmentRepository } from "./services/apartments/PostgresApartmentRepository";
import { PostgresTransactionRepository } from "./services/transactions/PostgresTransactionRepository";
import { PostgresExpenseRepository } from "./services/expenses/PostgresExpenseRepository";
import { PostgresBuildingRepository } from "./services/building/PostgresBuildingRepository";
import { PdfReportService } from "./services/reports/PdfReportService";
import { AuthHandler } from "./handlers/AuthHandler";
import { LoginUserAction } from "../actions/users/LoginUserAction";
import { PostgresUserRepository } from "./services/users/PostgresUserRepository";
import { UserHandler } from "./handlers/UserHandler";
import { GetUsersAction } from "../actions/users/GetUsersAction";
import { AddUserAction } from "../actions/users/AddUserAction";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const userRepository = new PostgresUserRepository();
const loginUserAction = new LoginUserAction(userRepository)
const auth = PassportMiddleware(loginUserAction);

app.use(express.json());
app.use("/", express.static(path.join(__dirname, "../../public")));
app.use(passport.initialize());

app.get("/ping", (req: Request, res: Response) => {
    res.send("pong pong");
});

const postgresConnection = new PostgresConnection();

const apartmentRepository = new PostgresApartmentRepository();
const transactionRepository = new PostgresTransactionRepository();
const expensesRepository = new PostgresExpenseRepository();
const buildingRepository = new PostgresBuildingRepository();
const reportService = new PdfReportService();

const addPaymentAction = new AddPaymentAction(transactionRepository)
const addApartmentAction = new AddApartmentAction(apartmentRepository);
const listApartmentsAction = new ListApartmentsAction(apartmentRepository);
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

const getUsersAction = new GetUsersAction(userRepository);
const addUserAction = new AddUserAction(userRepository);

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

const userHandler = new UserHandler(getUsersAction, addUserAction);

const authHandler = new AuthHandler();

app.post("/api/login", authHandler.login.bind(authHandler));

app.get("/api/apartments", auth, apartmentHandler.getAll.bind(apartmentHandler));
app.post("/api/apartments", apartmentHandler.add.bind(apartmentHandler));
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

app.post("/api/users", auth, userHandler.addUser.bind(userHandler));
app.get("/api/users", auth, userHandler.getUsers.bind(userHandler));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/index.html"));
});


app.listen(PORT, async () => {
    await postgresConnection.connect();
    console.log(`Listening on port ${PORT}`);
});



