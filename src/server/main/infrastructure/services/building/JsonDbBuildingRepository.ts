import { BuildingRepository } from "../../../domain/building/BuildingRepository";
import { Building } from "../../../domain/building/Building";
import { JsonDb } from "../../db/JsonDb";

export class JsonDbBuildingRepository implements BuildingRepository {

    private db: JsonDb;

    constructor() {
        this.db = new JsonDb();
    }

    getById(id: number): Promise<Building> {
        const buildings = this.db.get<Building>("buildings");
        const building = buildings.find(b => b.id === id);
        return Promise.resolve(building);
    }

    async getExpensesMount(id: number): Promise<number> {
        const building = await this.getById(id);
        let total = 0;
        building.expenses.forEach(detail => {
            total += detail.mount
        });
        return Promise.resolve(total);
    }

}