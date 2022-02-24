import Apartment from "../../../domain/apartments/Apartment";
import ApartmentRepository from "../../../domain/apartments/ApartmentRepository";
import JsonDb from "../../db/JsonDb";

export default class JsonDbApartmentRepository implements ApartmentRepository {

    private db: JsonDb;

    constructor() {
        this.db = new JsonDb();
    }

    add(apartment: Apartment): void {
        const apartments = this.db.get<Apartment>("apartments");
        apartment.id = apartments.length;
        apartments.push(apartment);
        this.db.set("apartments", apartments);
    }

    getAll(): Apartment[] {
        const apartments = this.db.get<Apartment>("apartments");
        return apartments;
    }

}