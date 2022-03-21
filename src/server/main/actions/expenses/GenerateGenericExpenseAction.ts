import { ApartmentRepository } from "../../domain/apartments/ApartmentRepository";
import { Expense } from "../../domain/expenses/Expense";
import { ExpenseDetail } from "../../domain/expenses/ExpenseDetail";
import { ExpenseRepository } from "../../domain/expenses/ExpenseRepository";

export class GenerateGenericExpenseAction {
    private expenseRepository: ExpenseRepository;
    private apartmentRepository: ApartmentRepository;

    constructor(expenseRepository: ExpenseRepository, apartmentRepository: ApartmentRepository) {
        this.expenseRepository = expenseRepository;
        this.apartmentRepository = apartmentRepository;
    }

    public async execute(data: ActionData): Promise<Expense> {

        if (data.apartmentId === undefined) {
            throw new Error("Invalid apartment");
        }

        if (!data.detail || data.detail.length === 0) {
            throw new Error("Invalid detail");
        }

        const apartment = await this.apartmentRepository.getById(data.apartmentId);
        console.log("EL APARTMENT", apartment);

        if (apartment === undefined) {
            throw new Error("Invalid apartment");
        }

        const creationDate = new Date();
        const expense = await this.expenseRepository.add({
            apartmentId: data.apartmentId,
            year: creationDate.getFullYear(),
            month: creationDate.getMonth() + 1,
            description: data.description,
            paid: false,
            detail: data.detail,
            createdDate: new Date()
        });

        console.log("LA CREADA", expense);

        return expense;
    }
}

interface ActionData {
    apartmentId: number;
    description: string;
    detail: ExpenseDetail[]
}