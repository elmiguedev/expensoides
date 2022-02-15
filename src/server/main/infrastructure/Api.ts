import express, { Request, Response } from "express";
import path from "path";
import AddApartmentAction from "../actions/AddApartmentAction";
import ListApartmentsAction from "../actions/ListApartmentsAction";
import ApartmentHandler from "./handlers/ApartmentHandler";
import InMemoryApartmentRepository from "./services/InMemoryApartmentRepository";
import JsonDbApartmentRepository from "./services/JsonDbApartmentRepository";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/", express.static(path.join(__dirname, "../../../app/dist")));
app.get("/ping", (req: Request, res: Response) => {
    res.send("pong pong");
});

const apartmentRepository = new JsonDbApartmentRepository();
const addApartmentAction = new AddApartmentAction(apartmentRepository);
const listApartmentsAction = new ListApartmentsAction(apartmentRepository);

const apartmentHandler = new ApartmentHandler(
    addApartmentAction,
    listApartmentsAction
);

app.post("/apartments", apartmentHandler.add.bind(apartmentHandler));
app.get("/apartments", apartmentHandler.getAll.bind(apartmentHandler));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});



