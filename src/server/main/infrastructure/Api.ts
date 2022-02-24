import express, { Request, Response } from "express";
import path from "path";
import AddApartmentAction from "../actions/apartments/AddApartmentAction";
import ListApartmentsAction from "../actions/apartments/ListApartmentsAction";
import AddEarningAction from "../actions/transactions/AddEarningAction";
import AddPaymentAction from "../actions/transactions/AddPaymentAction";
import GetBalanceAction from "../actions/transactions/GetBalanceAction";
import GetTransactionsAction from "../actions/transactions/GetTransactionsAction";
import ApartmentHandler from "./handlers/ApartmentHandler";
import TransactionHandler from "./handlers/TransactionHandler";
import InMemoryApartmentRepository from "./services/apartments/InMemoryApartmentRepository";
import JsonDbApartmentRepository from "./services/apartments/JsonDbApartmentRepository";
import JsonDbTransactionRepository from "./services/transactions/JsonDbTransactionRepository";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/", express.static(path.join(__dirname, "../../public")));
app.get("/ping", (req: Request, res: Response) => {
    res.send("pong pong");
});

const apartmentRepository = new JsonDbApartmentRepository();
const transactionRepository = new JsonDbTransactionRepository();

const addApartmentAction = new AddApartmentAction(apartmentRepository);
const listApartmentsAction = new ListApartmentsAction(apartmentRepository);
const addPaymentAction = new AddPaymentAction(transactionRepository);
const addEarningAction = new AddEarningAction(transactionRepository);
const getBalanceAction = new GetBalanceAction(transactionRepository);
const getTransactionsAction = new GetTransactionsAction(transactionRepository);

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

app.post("/api/apartments", apartmentHandler.add.bind(apartmentHandler));
app.get("/api/apartments", apartmentHandler.getAll.bind(apartmentHandler));

app.get("/api/transactions", transactionHandler.getAll.bind(transactionHandler));
app.post("/api/transactions/payment", transactionHandler.addPayment.bind(transactionHandler));
app.post("/api/transactions/earning", transactionHandler.addEarning.bind(transactionHandler));
app.get("/api/transactions/balance", transactionHandler.getBalance.bind(transactionHandler));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});



