import AddEarningAction from "../../../main/actions/transactions/AddEarningAction";
import AddPaymentAction from "../../../main/actions/transactions/AddPaymentAction";
import InMemoryTransactionRepository from "../../../main/infrastructure/services/transactions/InMemoryTransactionRepository";

describe("Add payment action", () => {

    test("should return a transaction on adding new negative register to total balance", () => {
        const transactionRepository = getTransactionRepository();
        const action = new AddPaymentAction(transactionRepository);

        const transaction = action.execute({
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