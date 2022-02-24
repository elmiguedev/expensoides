import express, { Request, Response } from "express";
import path from "path";
import AddApartmentAction from "../actions/apartments/AddApartmentAction";
import ListApartmentsAction from "../actions/apartments/ListApartmentsAction";
import ApartmentHandler from "./handlers/ApartmentHandler";
import InMemoryApartmentRepository from "./services/apartments/InMemoryApartmentRepository";
import JsonDbApartmentRepository from "./services/apartments/JsonDbApartmentRepository";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/", express.static(path.join(__dirname, "../../public")));
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

app.post("/api/apartments", apartmentHandler.add.bind(apartmentHandler));
app.get("/api/apartments", apartmentHandler.getAll.bind(apartmentHandler));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});



