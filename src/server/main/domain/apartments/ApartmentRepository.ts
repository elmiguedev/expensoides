import { Apartment } from "./Apartment";

export interface ApartmentRepository {
    add(apartment: Apartment): Promise<void>;
    getAll(): Promise<Apartment[]>;
    getById(id: number): Promise<Apartment>;
    getByBuildingId(buildingId: number): Promise<Apartment[]>;
}