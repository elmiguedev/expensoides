import { Apartment } from "../../../domain/apartments/Apartment";
import { ApartmentRepository } from "../../../domain/apartments/ApartmentRepository";

export class InMemoryApartmentRepository implements ApartmentRepository {

    private apartments: Array<Apartment>;

    constructor() {
        this.apartments = new Array();
    }

    add(apartment: Apartment): Promise<void> {
        return new Promise((resolve, reject) => {
            apartment.id = this.apartments.length;
            this.apartments.push(apartment);
            resolve();
        });
    }

    getAll(): Promise<Apartment[]> {
        return new Promise((resolve, reject) => {
            resolve(this.apartments);
        });
    }

}