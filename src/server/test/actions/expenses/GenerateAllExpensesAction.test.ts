import { GenerateAllExpensesAction } from "../../../main/actions/expenses/GenerateAllExpensesAction";
import { Expense } from "../../../main/domain/expenses/Expense";
import { InMemoryApartmentRepository } from "../../../main/infrastructure/services/apartments/InMemoryApartmentRepository";
import { InMemoryExpenseRepository } from "../../../main/infrastructure/services/expenses/InMemoryExpenseRepository";
import { InMemoryBuildingRepository } from "../../../main/infrastructure/services/building/InMemoryBuildingRepository";
import { GenerateExpensesAction } from "../../../main/actions/expenses/GenerateExpensesAction";

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

        const expenses: Expense[] = await generateAllExpensesAction.execute({ year, month });
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
            buildingRepository
        )

        const year = 2022;
        const month = 3;
        const apartmentId = 1;

        await generateExpensesAction.execute({
            year, month, apartmentId
        })

        const expenses: Expense[] = await generateAllExpensesAction.execute({ year, month });
        const apartments = await apartmentRepository.getAll();

        expect(expenses.length).toBe(apartments.length - 1);
        expect(expenses.find(exp => exp.apartmentId === 1)).toBeUndefined();
    });

})

const getApartmentRepository = async () => {
    const repository = new InMemoryApartmentRepository();
    await repository.add({
        number: 1,
        floor: 0,
        owner: "a"
    });
    await repository.add({
        number: 2,
        floor: 0,
        owner: "b"
    });
    await repository.add({
        number: 3,
        floor: 0,
        owner: "a"
    });
    return repository;
}

const getExpensesRepository = () => {
    return new InMemoryExpenseRepository();
}

const getBuildingRepository = () => {
    return new InMemoryBuildingRepository();
}