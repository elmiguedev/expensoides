import ApartmentRepository from "../../domain/apartments/ApartmentRepository";
import BuildingRepository from "../../domain/building/BuildingRepository";
import ExpenseRepository from "../../domain/expenses/ExpenseRepository";

export default class GenerateAllExpensesAction {
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

    public execute(data: ActionData) {
        const apartments = this.apartmentRepository.getAll();
        const expenses = [];
        apartments.forEach(apartment => {
            if (!this.checkExistingExpence(apartment.id, data.year, data.month)) {
                const expense = this.expenseRepository.add({
                    apartmentId: apartment.id,
                    year: data.year,
                    month: data.month,
                    mount: this.buildingRepository.getExpensesMount(),
                    description: "test"
                });

                this.expenseRepository.add(expense);
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
    year: number;
    month: number;
}