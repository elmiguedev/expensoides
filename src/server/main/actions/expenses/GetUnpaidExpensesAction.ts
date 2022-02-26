import ExpenseRepository from "../../domain/expenses/ExpenseRepository";

export default class GetUnpaidExpensesAction {
    private expenseRepository: ExpenseRepository;

    constructor(expenseRepository: ExpenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    public execute(data: ActionData) {
        return this.expenseRepository.getUnpaidByApartment(data.apartmentId);
    }

}

interface ActionData {
    apartmentId: number;
}