import AddApartmentAction from "../../../main/actions/apartments/AddApartmentAction";
import InMemoryApartmentRepository from "../../../main/infrastructure/services/apartments/InMemoryApartmentRepository";

describe("Add apartment action", () => {

    test("should get an apartment", () => {
        const action = new AddApartmentAction(
            getApartmentRepository()
        );

        const apartment = action.execute({
            number: 1,
            owner: "Pepe Argento",
            floor: 0,
        });

        expect(apartment).not.toBeNull();
        expect(apartment).not.toBeUndefined();
    });

    test("should throw an error if onwer is empty", () => {
        const action = new AddApartmentAction(
            getApartmentRepository()
        );
        expect(() => {
            const apartment = action.execute({
                number: 0,
                owner: "",
                floor: 0
            });

        }).toThrowError("Apartment owner is required");
    });

    test("should throw an error on invalid number", () => {
        const action = new AddApartmentAction(
            getApartmentRepository()
        );
        expect(() => {
            const apartment = action.execute({
                number: -1,
                owner: "Pepe",
                floor: 0
            });

        }).toThrowError("Apartment number is invalid");
    });


    test("should throw an error on invalid floor", () => {
        const action = new AddApartmentAction(
            getApartmentRepository()
        );
        expect(() => {
            const apartment = action.execute({
                number: 0,
                owner: "Pepe",
                floor: -1
            });

        }).toThrowError("Apartment floor is invalid");
    });

});

const getApartmentRepository = () => {
    return new InMemoryApartmentRepository();
}

