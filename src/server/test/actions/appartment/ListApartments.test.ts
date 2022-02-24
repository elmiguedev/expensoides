import AddApartmentAction from "../../../main/actions/apartments/AddApartmentAction";
import ListApartmentsAction from "../../../main/actions/apartments/ListApartmentsAction";
import InMemoryApartmentRepository from "../../../main/infrastructure/services/apartments/InMemoryApartmentRepository";

describe("Get list of apartment action", () => {

    test("should return an array", () => {
        const apartmentRepository = getApartmentRepository();
        const action = new ListApartmentsAction(apartmentRepository);
        const apartments = action.execute();
        expect(Array.isArray(apartments)).toBe(true);
    });

    test("should return an array with 1 item after add a apartment", () => {
        const apartmentRepository = getApartmentRepository();
        const addApartmentAction = new AddApartmentAction(apartmentRepository);
        const action = new ListApartmentsAction(apartmentRepository);

        const apartment = addApartmentAction.execute({
            floor: 0,
            number: 1,
            owner: "Pepe"
        });

        const apartments = action.execute();

        expect(apartments.length).toBe(1);
    });
});

const getApartmentRepository = () => {
    return new InMemoryApartmentRepository();
}