import { Building } from "./Building";

export interface BuildingRepository {
  getExpensesMount(id: number): Promise<number>;
  getById(id: number): Promise<Building>;
}