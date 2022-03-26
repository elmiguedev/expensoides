import { PayExpensesAction } from "../../../main/actions/expenses/PayExpensesAction";
import { Expense } from "../../../main/domain/expenses/Expense";
import { InMemoryExpenseRepository } from "../../../main/infrastructure/services/expenses/InMemoryExpenseRepository"
import { InMemoryTransactionRepository } from "../../../main/infrastructure/services/transactions/InMemoryTransactionRepository"
import { AddEarningAction } from "../../../main/actions/transactions/AddEarningAction";
import { GenerateExpensesAction } from "../../../main/actions/expenses/GenerateExpensesAction";
import { InMemoryApartmentRepository } from "../../../main/infrastructure/services/apartments/InMemoryApartmentRepository";
import { InMemoryBuildingRepository } from "../../../main/infrastructure/services/building/InMemoryBuildingRepository";
import { ExpenseRepository } from "../../../main/domain/expenses/ExpenseRepository";
import { InMemoryDb } from "../../../main/infrastructure/db/InMemoryDb";

describe("Pay expenses actions", () => {

    test("should register new earning transaction", async () => {
        const expenseRepository = getExpenseRepository();
        const transactionRepository = getTransactionRepository();
        const unpaidExpense = await generateExpensesForApartmentId1(expenseRepository);

        const payExpensesAction = new PayExpensesAction(
            expenseRepository,
            transactionRepository);

        const expense: Expense = await payExpensesAction.execute({ id: unpaidExpense.id })
        const transaction = await transactionRepository.getById(expense.transactionId);

        expect(transaction).toBeDefined();
        expect(transaction.mount).toBeGreaterThan(0);

    })

    test("should change expense status to paid", async () => {
        const expenseRepository = getExpenseRepository();
        const transactionRepository = getTransactionRepository();
        const unpaidExpense = await generateExpensesForApartmentId1(expenseRepository);

        const payExpensesAction = new PayExpensesAction(
            expenseRepository,
            transactionRepository);

        const expense: Expense = await payExpensesAction.execute({ id: unpaidExpense.id })

        expect(expense.paid).toEqual(true);
    })

    test("should register payment date", async () => {
        const expenseRepository = getExpenseRepository();
        const transactionRepository = getTransactionRepository();
        const unpaidExpense = await generateExpensesForApartmentId1(expenseRepository);

        const payExpensesAction = new PayExpensesAction(
            expenseRepository,
            transactionRepository);

        const expense: Expense = await payExpensesAction.execute({ id: unpaidExpense.id })
        const today = new Date();

        expect(expense.paymentDate.toDateString()).toEqual(today.toDateString());
    })

    test("should throw an error if expense is already paid", async () => {
        const expenseRepository = getExpenseRepository();
        const transactionRepository = getTransactionRepository();
        const unpaidExpense = await generateExpensesForApartmentId1(expenseRepository);

        const payExpensesAction = new PayExpensesAction(
            expenseRepository,
            transactionRepository);

        const expense: Expense = await payExpensesAction.execute({ id: unpaidExpense.id })

        expect(async () => {
            await payExpensesAction.execute({ id: unpaidExpense.id })
        }).rejects.toThrowError("Expense already paid");
    })

})

const getExpenseRepository = () => {
    InMemoryDb.getInstance().expenses = [];
    return new InMemoryExpenseRepository();
}

const getTransactionRepository = () => {
    InMemoryDb.getInstance().transactions = [];
    return new InMemoryTransactionRepository();
}

const getBuildingRepository = () => {
    return new InMemoryBuildingRepository();
}

const getApartmentRepository = () => {
    InMemoryDb.getInstance().apartments = [];
    const repository = new InMemoryApartmentRepository();
    repository.add({
        buildingId: 1,
        floor: 1,
        number: 1,
        owner: "test"
    });
    return repository;
}

const generateExpensesForApartmentId1 = (expenseRepository: ExpenseRepository) => {
    const buildingRepository = getBuildingRepository();
    const apartmentRepository = getApartmentRepository();

    const generateExpensesAction = new GenerateExpensesAction(
        expenseRepository,
        buildingRepository,
        apartmentRepository
    );

    const unpaidExpense = generateExpensesAction.execute({
        apartmentId: 0,
        month: 2,
        year: 2022
    });

    return unpaidExpense;
}