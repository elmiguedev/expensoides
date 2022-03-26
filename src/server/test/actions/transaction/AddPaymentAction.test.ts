import { AddPaymentAction } from "../../../main/actions/transactions/AddPaymentAction";
import { InMemoryDb } from "../../../main/infrastructure/db/InMemoryDb";
import { InMemoryTransactionRepository } from "../../../main/infrastructure/services/transactions/InMemoryTransactionRepository";

describe("Add payment action", () => {

    test("should return a transaction on adding new negative register to total balance", async () => {
        const transactionRepository = getTransactionRepository();
        const action = new AddPaymentAction(transactionRepository);

        const transaction = await action.execute({
            mount: 2,
            description: "",
        });

        expect(transaction).not.toBeUndefined();
        expect(transaction).not.toBeNull();

    })

})

const getTransactionRepository = () => {
    InMemoryDb.getInstance().transactions = [];
    return new InMemoryTransactionRepository();
}