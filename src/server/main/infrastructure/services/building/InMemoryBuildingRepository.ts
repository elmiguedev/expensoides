import Building from "../../../domain/building/Building";
import BuildingRepository from "../../../domain/building/BuildingRepository";

export default class InMemoryBuildingRepository implements BuildingRepository {
  private building: Building;
  constructor() {
    this.building = {
      id: 1,
      ordinaryExpense: 1600,
      extraordinaryExpense: 200
    }
  }

  getExpensesMount(): number {
    return this.building.extraordinaryExpense +
      this.building.ordinaryExpense;
  }

}