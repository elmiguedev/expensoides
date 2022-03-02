import { AddApartmentAction } from "../../../main/actions/apartments/AddApartmentAction";
import { InMemoryApartmentRepository } from "../../../main/infrastructure/services/apartments/InMemoryApartmentRepository";

describe("Add apartment action", () => {

    test("should get an apartment", async () => {
        const action = new AddApartmentAction(
            getApartmentRepository()
        );

        const apartment = await action.execute({
            number: 1,
            owner: "Pepe Argento",
            floor: 0,
        });

        expect(apartment).not.toBeNull();
        expect(apartment).not.toBeUndefined();
    });

    test("should throw an error if onwer is empty", async () => {
        const action = new AddApartmentAction(
            getApartmentRepository()
        );
        expect(async () => {
            const apartment = await action.execute({
                number: 0,
                owner: "",
                floor: 0
            });

        }).rejects.toThrowError("Apartment owner is required");
    });

    test("should throw an error on invalid number", async () => {
        const action = new AddApartmentAction(
            getApartmentRepository()
        );
        expect(async () => {
            const apartment = await action.execute({
                number: -1,
                owner: "Pepe",
                floor: 0
            });

        }).rejects.toThrowError("Apartment number is invalid");
    });


    test("should throw an error on invalid floor", async () => {
        const action = new AddApartmentAction(
            getApartmentRepository()
        );
        expect(async () => {
            const apartment = await action.execute({
                number: 0,
                owner: "Pepe",
                floor: -1
            });

        }).rejects.toThrowError("Apartment floor is invalid");
    });

});

const getApartmentRepository = () => {
    return new InMemoryApartmentRepository();
}

