import BuildingRepository from "../../../domain/building/BuildingRepository";
import Building from "../../../domain/building/Building";
import JsonDb from "../../db/JsonDb";

export default class JsonDbBuildingRepository implements BuildingRepository {

    private db: JsonDb;

    constructor() {
        this.db = new JsonDb();
    }

    getExpensesMount(): number {
        const buildings = this.db.get<Building>("buildings");
        const building = buildings[0];
        return building.extraordinaryExpense + building.ordinaryExpense;
    }

}