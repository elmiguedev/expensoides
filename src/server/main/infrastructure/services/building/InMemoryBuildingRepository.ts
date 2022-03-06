import { Building } from "../../../domain/building/Building";
import { BuildingRepository } from "../../../domain/building/BuildingRepository";

export class InMemoryBuildingRepository implements BuildingRepository {
  private buildings: Building[];

  constructor() {
    this.buildings = [];
    this.buildings.push({
      id: 1,
      name: "Torre Test",
      address: "Av. Siempre viva 123",
      admin: "Pepe Argento",
      cuit: "20-202020202020-2",
      expenses: [
        { description: "Expensas ordinarias", mount: 1800 },
        { description: "Expensas extraordinarias", mount: 200 }
      ]

    });
  }

  getById(id: number): Promise<Building> {
    const building = this.buildings.find(b => b.id === id);
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