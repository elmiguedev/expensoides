import { GenerateAllExpensesAction } from "../../../main/actions/expenses/GenerateAllExpensesAction";
import { Expense } from "../../../main/domain/expenses/Expense";
import { InMemoryApartmentRepository } from "../../../main/infrastructure/services/apartments/InMemoryApartmentRepository";
import { InMemoryExpenseRepository } from "../../../main/infrastructure/services/expenses/InMemoryExpenseRepository";
import { InMemoryBuildingRepository } from "../../../main/infrastructure/services/building/InMemoryBuildingRepository";
import { GenerateExpensesAction } from "../../../main/actions/expenses/GenerateExpensesAction";
import { InMemoryDb } from "../../../main/infrastructure/db/InMemoryDb";

describe("Generate All expenses action", () => {

    test("should generate one expense for each apartment", async () => {
        const apartmentRepository = await getApartmentRepository();
        const expensesRepository = getExpensesRepository();
        const buildingRepository = getBuildingRepository();

        const generateAllExpensesAction = new GenerateAllExpensesAction(
            apartmentRepository,
            expensesRepository,
            buildingRepository
        );
        const year = 2022;
        const month = 3;
        const buildingId = 1;
        const expenses: Expense[] = await generateAllExpensesAction.execute({ buildingId, year, month });
        const apartments = await apartmentRepository.getAll();
        expect(expenses.length).toBe(apartments.length);
        expect(expenses.filter(exp => exp.month === month && exp.year === year).length).toBe(expenses.length);
    });

    test("should generate expenses not generated before (for that year/month)", async () => {
        const apartmentRepository = await getApartmentRepository();
        const expensesRepository = getExpensesRepository();
        const buildingRepository = getBuildingRepository();

        const generateAllExpensesAction = new GenerateAllExpensesAction(
            apartmentRepository,
            expensesRepository,
            buildingRepository
        );
        const generateExpensesAction = new GenerateExpensesAction(
            expensesRepository,
            buildingRepository,
            apartmentRepository
        )

        const year = 2022;
        const month = 3;
        const buildingId = 1;
        const apartmentId = 1;

        await generateExpensesAction.execute({
            year, month, apartmentId
        })

        const expenses: Expense[] = await generateAllExpensesAction.execute({ buildingId, year, month });
        const apartments = await apartmentRepository.getAll();

        expect(expenses.length).toBe(apartments.length - 1);
        expect(expenses.find(exp => exp.apartmentId === 1)).toBeUndefined();
    });

})

const getApartmentRepository = async () => {
    InMemoryDb.getInstance().apartments = [];
    const repository = new InMemoryApartmentRepository();
    await repository.add({
        buildingId: 1,
        number: 1,
        floor: 0,
        owner: "a"
    });
    await repository.add({
        buildingId: 1,
        number: 2,
        floor: 0,
        owner: "b"
    });
    await repository.add({
        buildingId: 1,
        number: 3,
        floor: 0,
        owner: "a"
    });
    return repository;
}

const getExpensesRepository = () => {
    InMemoryDb.getInstance().expenses = [];
    return new InMemoryExpenseRepository();
}

const getBuildingRepository = () => {
    return new InMemoryBuildingRepository();
}