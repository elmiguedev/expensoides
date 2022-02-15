import Apartment from "../../domain/Apartment";
import ApartmentRepository from "../../domain/ApartmentRepository";

export default class InMemoryApartmentRepository implements ApartmentRepository {

    private apartments: Array<Apartment>;

    constructor() {
        this.apartments = new Array();
    }

    add(apartment: Apartment) {
        apartment.id = this.apartments.length;
        this.apartments.push(apartment);
    }

    getAll(): Apartment[] {
        return this.apartments;
    }

}