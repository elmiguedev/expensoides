import { ApartmentRepository } from "../../domain/apartments/ApartmentRepository";
import { BuildingRepository } from "../../domain/building/BuildingRepository";
import { Expense } from "../../domain/expenses/Expense";
import { ExpenseRepository } from "../../domain/expenses/ExpenseRepository";

export class GenerateExpensesAction {
  private expenseRepository: ExpenseRepository;
  private buildingRepository: BuildingRepository;
  private apartmentRepository: ApartmentRepository;

  constructor(expenseRepository: ExpenseRepository, buildingRepository: BuildingRepository, apartmentRepository: ApartmentRepository) {
    this.expenseRepository = expenseRepository;
    this.buildingRepository = buildingRepository;
    this.apartmentRepository = apartmentRepository;
  }

  public async execute(data: ActionData): Promise<Expense> {
    const oldExpense = await this.isExpenseAlredyCreated(data);
    if (oldExpense) {
      throw new Error("Expenses already generated");
    }

    const apartment = await this.apartmentRepository.getById(data.apartmentId);
    const building = await this.buildingRepository.getById(apartment.buildingId);
    const expense = await this.expenseRepository.add({
      apartmentId: data.apartmentId,
      year: data.year,
      month: data.month,
      description: "test",
      paid: false,
      detail: building.expenses
    });
    return expense;
  }

  private async isExpenseAlredyCreated(data: ActionData) {
    const ex = await this.expenseRepository.getExpense(
      data.apartmentId, data.year, data.month
    );
    return ex;
  }
}

interface ActionData {
  apartmentId: number;
  year: number;
  month: number;
}