import Apartment from "../../domain/apartments/Apartment";
import ApartmentRepository from "../../domain/apartments/ApartmentRepository";

export default class AddApartmentAction {
    private apartmentRepository: ApartmentRepository;

    constructor(apartmentRepository: ApartmentRepository) {
        this.apartmentRepository = apartmentRepository;
    }

    public execute(actionData: ActionData): Apartment {

        if (!actionData.owner) {
            throw new Error("Apartment owner is required");
        }

        if (actionData.number < 0) {
            throw new Error("Apartment number is invalid");
        }

        if (actionData.floor < 0) {
            throw new Error("Apartment floor is invalid");
        }

        const apartment: Apartment = {
            floor: actionData.floor,
            number: actionData.number,
            owner: actionData.owner
        }

        this.apartmentRepository.add(apartment);

        return apartment;
    }
}

interface ActionData {
    floor: number;
    owner: string;
    number: number;
}