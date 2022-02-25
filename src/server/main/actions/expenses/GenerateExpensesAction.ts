import ApartmentRepository from "../../domain/apartments/ApartmentRepository";
import BuildingRepository from "../../domain/building/BuildingRepository";
import Expense from "../../domain/expenses/Expense";
import ExpenseRepository from "../../domain/expenses/ExpenseRepository";

export default class GenerateExpensesAction {
  private apartmentRepository: ApartmentRepository;
  private expenseRepository: ExpenseRepository;
  private buildingRepository: BuildingRepository;

  constructor(apartmentRepository: ApartmentRepository, expenseRepository: ExpenseRepository, buildingRepository: BuildingRepository) {
    this.apartmentRepository = apartmentRepository;
    this.expenseRepository = expenseRepository;
    this.buildingRepository = buildingRepository;
  }

  public execute(data: ActionData): Expense {
    if (this.isExpenseAlredyCreated(data)) {
      throw new Error("Expenses already generated");
    }
    const expense = this.expenseRepository.add({
      apartmentId: data.apartmentId,
      year: data.year,
      month: data.month,
      mount: this.buildingRepository.getExpensesMount(),
      description: "test"
    });
    return expense;
  }

  private isExpenseAlredyCreated(data: ActionData) {
    const ex = this.expenseRepository.getExpense(
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