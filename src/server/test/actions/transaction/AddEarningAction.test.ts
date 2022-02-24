import AddEarningAction from "../../../main/actions/transactions/AddEarningAction";
import InMemoryTransactionRepository from "../../../main/infrastructure/services/transactions/InMemoryTransactionRepository";

describe("Add earning task", () => {

    test("should return a transaction on adding new positive register to total balance", () => {
        const transactionRepository = getTransactionRepository();
        const action = new AddEarningAction(transactionRepository);

        const transaction =  action.execute({
            apartmentId: 1,
            mount: 2,
            description: "",
        });

        expect(transaction).not.toBeUndefined();
        expect(transaction).not.toBeNull();

    })

})

const getTransactionRepository = () => {
    return new InMemoryTransactionRepository();
}