import Apartment from "../../domain/apartments/Apartment";
import ApartmentRepository from "../../domain/apartments/ApartmentRepository";

export default class ListApartmentsAction {
    private apartmentRepository: ApartmentRepository;

    constructor(apartmentRepository: ApartmentRepository) {
        this.apartmentRepository = apartmentRepository;
    }

    public execute(): Array<Apartment> {
        return this.apartmentRepository.getAll();
    }
}