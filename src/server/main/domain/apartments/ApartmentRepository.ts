import { Apartment } from "./Apartment";

export interface ApartmentRepository {
    add(apartment: Apartment): void;
    getAll(): Array<Apartment>;
}