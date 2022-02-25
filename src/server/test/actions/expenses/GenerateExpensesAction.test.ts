import InMemoryApartmentRepository from "../../../main/infrastructure/services/apartments/InMemoryApartmentRepository";
import ListApartmentsAction from "../../../main/actions/apartments/ListApartmentsAction";
import GenerateExpensesAction from "../../../main/actions/expenses/GenerateExpensesAction";
import AddApartmentAction from "../../../main/actions/apartments/AddApartmentAction";
import InMemoryExpenseRepository from "../../../main/infrastructure/services/expenses/InMemoryExpenseRepository";
import InMemoryBuildingRepository from "../../../main/infrastructure/services/building/InMemoryBuildingRepository";

describe("GenerateExpenses Action", () => {
  test("should generate new expense entity", () => {
    const apartmentRepository = getApartmentRepository();
    const expensesRespository = getExpensesRepository();
    const buildingRespository = getBuildingRepository();

    const generateExpensesAction = new GenerateExpensesAction(
      apartmentRepository,
      expensesRespository,
      buildingRespository
    );
    const addApartmentAction = new AddApartmentAction(apartmentRepository);

    addApartmentAction.execute({
      number: 1,
      owner: "prueba",
      floor: 0
    })

    const expenses = generateExpensesAction.execute({
      apartmentId: 1,
      year: 2020,
      month: 2
    });

    expect(expenses).toBeDefined();

  })

  test("shoud throw an error if there are alredy generated expenses for current year / month", () => {
    const apartmentRepository = getApartmentRepository();
    const expensesRepository = getExpensesRepository();
    const buildingRepository = getBuildingRepository();

    const generateExpensesAction = new GenerateExpensesAction(
      apartmentRepository,
      expensesRepository,
      buildingRepository
    );
    const addApartmentAction = new AddApartmentAction(apartmentRepository);

    addApartmentAction.execute({
      number: 1,
      owner: "prueba",
      floor: 0
    });

    const expenses = generateExpensesAction.execute({
      apartmentId: 1,
      year: 2020,
      month: 2
    });

    expect(() => {
      const newExpenses = generateExpensesAction.execute({
        apartmentId: 1,
        year: 2020,
        month: 2
      });
    }).toThrowError("Expenses already generated");

  })

  test("should assign the presetted expense mount", () => {
    const apartmentRepository = getApartmentRepository();
    const expensesRepository = getExpensesRepository();
    const buildingRepository = getBuildingRepository();

    const generateExpensesAction = new GenerateExpensesAction(
      apartmentRepository,
      expensesRepository,
      buildingRepository
    );
    const addApartmentAction = new AddApartmentAction(apartmentRepository);

    const expectedMount = 1800;

    addApartmentAction.execute({
      number: 1,
      owner: "prueba",
      floor: 0
    })

    const expenses = generateExpensesAction.execute({
      apartmentId: 1,
      year: 2020,
      month: 2
    });

    expect(expenses.mount).toBe(expectedMount);
  })

  test("should calculate interest on payments due", () => {
  });

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