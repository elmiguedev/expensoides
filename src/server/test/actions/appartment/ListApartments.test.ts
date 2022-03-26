import { AddApartmentAction } from "../../../main/actions/apartments/AddApartmentAction";
import { ListApartmentsAction } from "../../../main/actions/apartments/ListApartmentsAction";
import { InMemoryDb } from "../../../main/infrastructure/db/InMemoryDb";
import { InMemoryApartmentRepository } from "../../../main/infrastructure/services/apartments/InMemoryApartmentRepository";

describe("Get list of apartment action", () => {

    test("should return an array", async () => {
        const apartmentRepository = getApartmentRepository();
        const action = new ListApartmentsAction(apartmentRepository);
        const apartments = await action.execute();
        expect(Array.isArray(apartments)).toBe(true);
    });

    test("should return an array with 1 item after add a apartment", async () => {
        const apartmentRepository = getApartmentRepository();

        const addApartmentAction = new AddApartmentAction(apartmentRepository);
        const action = new ListApartmentsAction(apartmentRepository);

        const apartment = await addApartmentAction.execute({
            buildingId: 1,
            floor: 0,
            number: 1,
            owner: "Pepe"
        });

        const apartments = await action.execute();

        expect(apartments.length).toBe(1);
    });
});

const getApartmentRepository = () => {
    InMemoryDb.getInstance().apartments = [];
    return new InMemoryApartmentRepository();
}
