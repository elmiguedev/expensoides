import Apartment from "../domain/Apartment";
import ApartmentRepository from "../domain/ApartmentRepository";

export default class ListApartmentsAction {
    private apartmentRepository: ApartmentRepository;

    constructor(apartmentRepository: ApartmentRepository) {
        this.apartmentRepository = apartmentRepository;
    }

    public execute(): Array<Apartment> {
        return this.apartmentRepository.getAll();
    }
}