import AddEarningAction from "../../../main/actions/transactions/AddEarningAction";
import AddPaymentAction from "../../../main/actions/transactions/AddPaymentAction";
import GetBalanceAction from "../../../main/actions/transactions/GetBalanceAction";
import InMemoryTransactionRepository from "../../../main/infrastructure/services/transactions/InMemoryTransactionRepository";

describe("Get balance action", () => {
    test("should get the sum of all transactions ", () => {
        const transactionRepository = getTransactionRepository();
        const addEarningAction = new AddEarningAction(transactionRepository);
        const addPaymentAction = new AddPaymentAction(transactionRepository);
        const balanceAction = new GetBalanceAction(transactionRepository);

        addEarningAction.execute({
            mount: 2000,
            apartmentId: 1,
            description: ""
        });
        addEarningAction.execute({
            mount: 1000,
            apartmentId: 1,
            description: ""
        });
        addPaymentAction.execute({
            mount: 800,
            apartmentId: 1,
            description: ""
        });

        const balance = balanceAction.execute();

        expect(balance).toStrictEqual(2200);

    })
})

const getTransactionRepository = () => {
    return new InMemoryTransactionRepository();
}