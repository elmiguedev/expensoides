import { Building } from "../../../domain/building/Building";
import { BuildingRepository } from "../../../domain/building/BuildingRepository";

export class InMemoryBuildingRepository implements BuildingRepository {
  private building: Building;
  constructor() {
    this.building = {
      id: 1,
      ordinaryExpense: 1600,
      extraordinaryExpense: 200
    }
  }

  getExpensesMount(): Promise<number> {
    return new Promise((resolve, reject) => {
      resolve(this.building.extraordinaryExpense +
        this.building.ordinaryExpense);
    });
  }

}