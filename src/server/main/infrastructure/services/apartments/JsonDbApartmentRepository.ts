import { Apartment } from "../../../domain/apartments/Apartment";
import { ApartmentRepository } from "../../../domain/apartments/ApartmentRepository";
import { JsonDb } from "../../db/JsonDb";

export class JsonDbApartmentRepository implements ApartmentRepository {

    private db: JsonDb;

    constructor() {
        this.db = new JsonDb();
    }

    add(apartment: Apartment): Promise<void> {
        const apartments = this.db.get<Apartment>("apartments");
        apartment.id = apartments.length;
        apartments.push(apartment);
        this.db.set("apartments", apartments);
        return Promise.resolve();
    }

    getAll(): Promise<Apartment[]> {
        const apartments = this.db.get<Apartment>("apartments");
        return Promise.resolve(apartments);
    }

}