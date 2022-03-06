import { GetAllExpensesAction } from "../../../main/actions/expenses/GetAllExpensesAction";
import { InMemoryExpenseRepository } from "../../../main/infrastructure/services/expenses/InMemoryExpenseRepository"

describe("Get all expenses action", () => {
    test("should list expenses array", async () => {
        const expenseRepository = getExpenseRepository();
        expenseRepository.add({
            apartmentId: 1,
            month: 1,
            year: 2022,
            id: 1,
            paid: false,
            description: "",
            detail: [
                { description: "", mount: 1800 },
                { description: "", mount: 200 },
            ]
        });

        const action = new GetAllExpensesAction(expenseRepository);
        const expenses = await action.execute();

        expect(Array.isArray(expenses)).toBe(true);
    })
})

const getExpenseRepository = () => {
    return new InMemoryExpenseRepository();
}