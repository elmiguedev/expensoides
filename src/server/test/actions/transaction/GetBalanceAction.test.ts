import { AddEarningAction } from "../../../main/actions/transactions/AddEarningAction";
import { AddPaymentAction } from "../../../main/actions/transactions/AddPaymentAction";
import { GetBalanceAction } from "../../../main/actions/transactions/GetBalanceAction";
import { InMemoryDb } from "../../../main/infrastructure/db/InMemoryDb";
import { InMemoryTransactionRepository } from "../../../main/infrastructure/services/transactions/InMemoryTransactionRepository";

describe("Get balance action", () => {
    test("should get the sum of all transactions ", async () => {
        const transactionRepository = getTransactionRepository();
        const addEarningAction = new AddEarningAction(transactionRepository);
        const addPaymentAction = new AddPaymentAction(transactionRepository);
        const balanceAction = new GetBalanceAction(transactionRepository);

        await addEarningAction.execute({
            mount: 2000,
            description: ""
        });
        await addEarningAction.execute({
            mount: 1000,
            description: ""
        });
        await addPaymentAction.execute({
            mount: 800,
            description: ""
        });

        const balance = await balanceAction.execute();

        expect(balance).toStrictEqual(2200);

    })
})

const getTransactionRepository = () => {
    InMemoryDb.getInstance().transactions = [];
    return new InMemoryTransactionRepository();
}