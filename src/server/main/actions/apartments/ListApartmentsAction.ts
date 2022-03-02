import { Apartment } from "../../domain/apartments/Apartment";
import { ApartmentRepository } from "../../domain/apartments/ApartmentRepository";

export class ListApartmentsAction {
    private apartmentRepository: ApartmentRepository;

    constructor(apartmentRepository: ApartmentRepository) {
        this.apartmentRepository = apartmentRepository;
    }

    public execute(): Promise<Apartment[]> {
        return this.apartmentRepository.getAll();
    }
}