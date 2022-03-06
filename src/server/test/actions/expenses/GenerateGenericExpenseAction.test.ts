import { GenerateGenericExpenseAction } from "../../../main/actions/expenses/GenerateGenericExpenseAction";
import { Expense } from "../../../main/domain/expenses/Expense";
import { InMemoryExpenseRepository } from "../../../main/infrastructure/services/expenses/InMemoryExpenseRepository";

describe("generate generic expense action", () => {

    test("should register a new expense", async () => {

        const expenseRepository = getExpenseRepository();
        const action = new GenerateGenericExpenseAction(expenseRepository);

        const expense = await action.execute({
            apartmentId: 1,
            description: "Test generic expense",
            detail: [
                { description: "Test 1", mount: 100 },
                { description: "Test 2", mount: 300 },
            ]
        })

        expect(expense).toBeDefined();

    })



});

const getExpenseRepository = () => {
    return new InMemoryExpenseRepository();
}