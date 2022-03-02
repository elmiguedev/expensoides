export interface BuildingRepository {
  getExpensesMount(): Promise<number>;
}