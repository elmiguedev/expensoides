import Apartment from "./Apartment";

export default interface ApartmentRepository {
    add(apartment: Apartment): void;
    getAll(): Array<Apartment>;
}