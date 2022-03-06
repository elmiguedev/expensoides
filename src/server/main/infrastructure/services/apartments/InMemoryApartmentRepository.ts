import { Apartment } from "../../../domain/apartments/Apartment";
import { ApartmentRepository } from "../../../domain/apartments/ApartmentRepository";

export class InMemoryApartmentRepository implements ApartmentRepository {

    private apartments: Apartment[];

    constructor() {
        this.apartments = [];
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

    getById(id: number): Promise<Apartment> {
        return new Promise((resolve, reject) => {
            const apartment = this.apartments.find(a => a.id === id);
            if (apartment) {
                resolve(apartment);
            } else {
                reject();
            }
        });
    }

}