import { GenerateGenericExpenseAction } from "../../../main/actions/expenses/GenerateGenericExpenseAction";
import { Expense } from "../../../main/domain/expenses/Expense";
import { InMemoryDb } from "../../../main/infrastructure/db/InMemoryDb";
import { InMemoryApartmentRepository } from "../../../main/infrastructure/services/apartments/InMemoryApartmentRepository";
import { InMemoryExpenseRepository } from "../../../main/infrastructure/services/expenses/InMemoryExpenseRepository";

describe("generate generic expense action", () => {

    test("should register a new expense", async () => {

        const expenseRepository = getExpenseRepository();
        const apartmentRepository = await getApartmentRepository();
        const action = new GenerateGenericExpenseAction(expenseRepository, apartmentRepository);

        const expense = await action.execute({
            apartmentId: 0,
            description: "Test generic expense",
            detail: [
                { description: "Test 1", mount: 100 },
                { description: "Test 2", mount: 300 },
            ]
        })

        expect(expense).toBeDefined();

    })

    test("should throw an erro on an empty apartment", async () => {
        const expenseRepository = getExpenseRepository();
        const apartmentRepository = await getApartmentRepository();
        const action = new GenerateGenericExpenseAction(expenseRepository, apartmentRepository);

        expect(async () => {
            const expense = await action.execute({
                apartmentId: undefined,
                description: "Test generic expense",
                detail: [
                    { description: "Test 1", mount: 100 },
                    { description: "Test 2", mount: 300 },
                ]
            })
        }).rejects.toThrowError("Invalid apartment");

    })

    test("should throw an error on empty detail", async () => {
        const expenseRepository = getExpenseRepository();
        const apartmentRepository = await getApartmentRepository();

        const action = new GenerateGenericExpenseAction(expenseRepository, apartmentRepository);

        expect(async () => {
            const expense = await action.execute({
                apartmentId: 0,
                description: "Test generic expense",
                detail: []
            })
        }).rejects.toThrowError("Invalid detail");

    })

    test("should throw an error if apartment does not exists", async () => {
        const expenseRepository = getExpenseRepository();
        const apartmentRepository = await getApartmentRepository();

        const action = new GenerateGenericExpenseAction(expenseRepository, apartmentRepository);

        expect(async () => {
            const expense = await action.execute({
                apartmentId: 9,
                description: "Test generic expense",
                detail: [
                    { description: "Test 1", mount: 100 },
                    { description: "Test 2", mount: 300 },
                ]
            })
        }).rejects.toThrowError("Invalid apartment");

    })



});

const getExpenseRepository = () => {
    InMemoryDb.getInstance().expenses = [];
    return new InMemoryExpenseRepository();
}

const getApartmentRepository = async () => {
    InMemoryDb.getInstance().apartments = [];
    const repository = new InMemoryApartmentRepository();
    await repository.add({
        buildingId: 1,
        floor: 1,
        number: 1,
        owner: "test"
    });
    return repository;
}