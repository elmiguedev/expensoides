import { ApartmentRepository } from "../../domain/apartments/ApartmentRepository";
import { BuildingRepository } from "../../domain/building/BuildingRepository";
import { Expense } from "../../domain/expenses/Expense";
import { ExpenseRepository } from "../../domain/expenses/ExpenseRepository";

export class GenerateAllExpensesAction {
    private apartmentRepository: ApartmentRepository;
    private expenseRepository: ExpenseRepository;
    private buildingRepository: BuildingRepository;

    constructor(
        apartmentRepository: ApartmentRepository,
        expenseRepository: ExpenseRepository,
        buildingRepository: BuildingRepository
    ) {
        this.apartmentRepository = apartmentRepository;
        this.expenseRepository = expenseRepository;
        this.buildingRepository = buildingRepository;
    }

    public async execute(data: ActionData) {
        const building = await this.buildingRepository.getById(data.buildingId);
        const apartments = await this.apartmentRepository.getAll();
        const expenses: Expense[] = [];

        apartments.forEach(async apartment => {
            const hasExpenses = await this.checkExistingExpence(apartment.id, data.year, data.month);
            if (apartment.id !== undefined && !hasExpenses) {
                const expense: Expense = {
                    apartmentId: apartment.id,
                    year: data.year,
                    month: data.month,
                    description: "test",
                    paid: false,
                    detail: building.expenses
                };

                await this.expenseRepository.add(expense);
                expenses.push(expense);
            }
        });
        return expenses;
    }

    private checkExistingExpence(apartmentId: number, year: number, month: number) {
        return this.expenseRepository.getExpense(apartmentId, year, month);
    }
}

interface ActionData {
    buildingId: number;
    year: number;
    month: number;
}