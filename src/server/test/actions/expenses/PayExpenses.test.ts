import { InMemoryExpenseRepository } from "../../../main/infrastructure/services/expenses/InMemoryExpenseRepository"
import { InMemoryTransactionRepository } from "../../../main/infrastructure/services/transactions/InMemoryTransactionRepository"


describe("Pay expenses actions", () => {

    test("should register new earning transaction", () => {
        const expenseRepository = getExpenseRepository();
        const transactionRepository = getTransactionRepository();

        const payExpensesAction = new PayExpensesAction();


        const expense = payExpensesAction.execute({ id: 1 })
    })

    test("should change expense status to paid", () => {

    })

    test("should register payment date", () => {

    })

    test("should save transaction id on expense entity", () => {

    })

    test("should throw an error if expense is already paid", () => {

    })

})

const getExpenseRepository = () => {
    return new InMemoryExpenseRepository();
}

const getTransactionRepository = () => {
    return new InMemoryTransactionRepository();
}