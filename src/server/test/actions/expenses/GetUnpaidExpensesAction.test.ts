import { GetUnpaidExpensesAction } from "../../../main/actions/expenses/GetUnpaidExpensesAction";
import { Expense } from "../../../main/domain/expenses/Expense";
import { InMemoryDb } from "../../../main/infrastructure/db/InMemoryDb";
import { InMemoryExpenseRepository } from "../../../main/infrastructure/services/expenses/InMemoryExpenseRepository"

describe("Get unpaid expenses action", () => {

    test("should list all expenses of an apartment, with unpaid status", async () => {
        const expenseRepository = getExpenseRepository();
        const action = new GetUnpaidExpensesAction(expenseRepository);

        const apartmentId = 1;
        const year = 2022;
        const month = 2;

        await expenseRepository.add({
            apartmentId: 2,
            year,
            month: 2,
            description: "",
            paid: false,
            detail: [
                { description: "", mount: 1800 },
                { description: "", mount: 200 },
            ]
        });

        const unpaidExpense = await expenseRepository.add({
            apartmentId,
            year,
            month,
            description: "",
            detail: [
                { description: "", mount: 1800 },
                { description: "", mount: 200 },
            ],
            paid: false
        });

        const unpaidExpenses: Expense[] = await action.execute({ apartmentId });

        expect(unpaidExpenses.length).toBe(1);
        expect(unpaidExpenses[0]).toBe(unpaidExpense);

    })

})

const getExpenseRepository = () => {
    InMemoryDb.getInstance().expenses = [];
    return new InMemoryExpenseRepository();
}