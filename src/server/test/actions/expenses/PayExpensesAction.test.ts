import { PayExpensesAction } from "../../../main/actions/expenses/PayExpensesAction";
import { Expense } from "../../../main/domain/expenses/Expense";
import { InMemoryExpenseRepository } from "../../../main/infrastructure/services/expenses/InMemoryExpenseRepository"
import { InMemoryTransactionRepository } from "../../../main/infrastructure/services/transactions/InMemoryTransactionRepository"
import { AddEarningAction } from "../../../main/actions/transactions/AddEarningAction";
import { GenerateExpensesAction } from "../../../main/actions/expenses/GenerateExpensesAction";
import { InMemoryApartmentRepository } from "../../../main/infrastructure/services/apartments/InMemoryApartmentRepository";
import { InMemoryBuildingRepository } from "../../../main/infrastructure/services/building/InMemoryBuildingRepository";
import { ExpenseRepository } from "../../../main/domain/expenses/ExpenseRepository";

describe("Pay expenses actions", () => {

    test("should register new earning transaction", () => {
        const expenseRepository = getExpenseRepository();
        const transactionRepository = getTransactionRepository();
        const addEarningAction = new AddEarningAction(transactionRepository);
        const unpaidExpense = generateExpensesForApartmentId1(expenseRepository);

        const payExpensesAction = new PayExpensesAction(
            expenseRepository,
            addEarningAction);

        const expense: Expense = payExpensesAction.execute({ id: unpaidExpense.id })
        const transaction = transactionRepository.getById(expense.transactionId);

        expect(transaction).toBeDefined();
        expect(transaction.mount).toBeGreaterThan(0);

    })

    test("should change expense status to paid", () => {
        const expenseRepository = getExpenseRepository();
        const transactionRepository = getTransactionRepository();
        const addEarningAction = new AddEarningAction(transactionRepository);
        const unpaidExpense = generateExpensesForApartmentId1(expenseRepository);

        const payExpensesAction = new PayExpensesAction(
            expenseRepository,
            addEarningAction);

        const expense: Expense = payExpensesAction.execute({ id: unpaidExpense.id })

        expect(expense.paid).toEqual(true);
    })

    test("should register payment date", () => {
        const expenseRepository = getExpenseRepository();
        const transactionRepository = getTransactionRepository();
        const addEarningAction = new AddEarningAction(transactionRepository);
        const unpaidExpense = generateExpensesForApartmentId1(expenseRepository);

        const payExpensesAction = new PayExpensesAction(
            expenseRepository,
            addEarningAction);

        const expense: Expense = payExpensesAction.execute({ id: unpaidExpense.id })
        const today = new Date();

        expect(expense.paymentDate.toDateString()).toEqual(today.toDateString());
    })

    test("should throw an error if expense is already paid", () => {
        const expenseRepository = getExpenseRepository();
        const transactionRepository = getTransactionRepository();
        const addEarningAction = new AddEarningAction(transactionRepository);
        const unpaidExpense = generateExpensesForApartmentId1(expenseRepository);

        const payExpensesAction = new PayExpensesAction(
            expenseRepository,
            addEarningAction);

        const expense: Expense = payExpensesAction.execute({ id: unpaidExpense.id })

        expect(() => {
            payExpensesAction.execute({ id: unpaidExpense.id })
        }).toThrowError("Expense already paid");
    })

})

const getExpenseRepository = () => {
    return new InMemoryExpenseRepository();
}

const getTransactionRepository = () => {
    return new InMemoryTransactionRepository();
}

const getBuildingRepository = () => {
    return new InMemoryBuildingRepository();
}

const getApartmentRepository = () => {
    const repository = new InMemoryApartmentRepository();
    repository.add({
        floor: 1,
        number: 1,
        owner: "test",
        id: 1
    });
    return repository;
}

const generateExpensesForApartmentId1 = (expenseRepository: ExpenseRepository) => {
    const apartmentRepository = getApartmentRepository();
    const buildingRepository = getBuildingRepository();

    const generateExpensesAction = new GenerateExpensesAction(
        apartmentRepository,
        expenseRepository,
        buildingRepository
    );

    const unpaidExpense = generateExpensesAction.execute({
        apartmentId: 1,
        month: 2,
        year: 2022
    });

    return unpaidExpense;
}