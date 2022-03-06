import { InMemoryApartmentRepository } from "../../../main/infrastructure/services/apartments/InMemoryApartmentRepository";
import { GenerateExpensesAction } from "../../../main/actions/expenses/GenerateExpensesAction";
import { AddApartmentAction } from "../../../main/actions/apartments/AddApartmentAction";
import { InMemoryExpenseRepository } from "../../../main/infrastructure/services/expenses/InMemoryExpenseRepository";
import { InMemoryBuildingRepository } from "../../../main/infrastructure/services/building/InMemoryBuildingRepository";

describe("GenerateExpenses Action", () => {
  test("should generate new expense entity", async () => {
    const apartmentRepository = getApartmentRepository();
    const expensesRespository = getExpensesRepository();
    const buildingRespository = getBuildingRepository();

    const generateExpensesAction = new GenerateExpensesAction(
      expensesRespository,
      buildingRespository,
      apartmentRepository
    );
    const addApartmentAction = new AddApartmentAction(apartmentRepository);

    await addApartmentAction.execute({
      buildingId: 1,
      number: 1,
      owner: "prueba",
      floor: 0
    })

    const expenses = await generateExpensesAction.execute({
      apartmentId: 0,
      year: 2020,
      month: 2
    });

    expect(expenses).toBeDefined();

  })

  test("shoud throw an error if there are alredy generated expenses for current year / month", async () => {
    const apartmentRepository = getApartmentRepository();
    const expensesRepository = getExpensesRepository();
    const buildingRepository = getBuildingRepository();

    const generateExpensesAction = new GenerateExpensesAction(
      expensesRepository,
      buildingRepository,
      apartmentRepository
    );
    const addApartmentAction = new AddApartmentAction(apartmentRepository);

    await addApartmentAction.execute({
      buildingId: 1,
      number: 1,
      owner: "prueba",
      floor: 0
    });

    const expenses = await generateExpensesAction.execute({
      apartmentId: 0,
      year: 2020,
      month: 2
    });

    expect(async () => {
      const newExpenses = await generateExpensesAction.execute({
        apartmentId: 0,
        year: 2020,
        month: 2
      });
    }).rejects.toThrowError("Expenses already generated");

  })

  test("should assign the presetted expense mount", async () => {
    const apartmentRepository = getApartmentRepository();
    const expensesRepository = getExpensesRepository();
    const buildingRepository = getBuildingRepository();

    const generateExpensesAction = new GenerateExpensesAction(
      expensesRepository,
      buildingRepository,
      apartmentRepository
    );
    const addApartmentAction = new AddApartmentAction(apartmentRepository);

    const expectedMount = 2000;

    await addApartmentAction.execute({
      buildingId: 1,
      number: 1,
      owner: "prueba",
      floor: 0
    })

    const expenses = await generateExpensesAction.execute({
      apartmentId: 0,
      year: 2020,
      month: 2
    });

    let currentMount = 0;
    expenses.detail.forEach(detail => {
      currentMount += detail.mount;
    });

    expect(currentMount).toBe(expectedMount);
  })

})

const getApartmentRepository = () => {
  return new InMemoryApartmentRepository();
}

const getExpensesRepository = () => {
  return new InMemoryExpenseRepository();
}

const getBuildingRepository = () => {
  return new InMemoryBuildingRepository();
}