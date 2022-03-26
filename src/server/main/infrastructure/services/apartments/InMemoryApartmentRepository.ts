import { Apartment } from "../../../domain/apartments/Apartment";
import { ApartmentRepository } from "../../../domain/apartments/ApartmentRepository";
import { InMemoryDb } from "../../db/InMemoryDb";

export class InMemoryApartmentRepository implements ApartmentRepository {

    getByBuildingId(buildingId: number): Promise<Apartment[]> {
        const apartments = InMemoryDb.getInstance().apartments.filter(a => a.buildingId === buildingId);
        return Promise.resolve(apartments);
    }

    add(apartment: Apartment): Promise<void> {
        return new Promise((resolve, reject) => {
            apartment.id = InMemoryDb.getInstance().apartments.length;
            InMemoryDb.getInstance().apartments.push(apartment);
            resolve();
        });
    }

    getAll(): Promise<Apartment[]> {
        return new Promise((resolve, reject) => {
            resolve(InMemoryDb.getInstance().apartments);
        });
    }

    getById(id: number): Promise<Apartment> {
        const apartment = InMemoryDb.getInstance().apartments.find(a => a.id === id);
        return Promise.resolve(apartment);
    }

}