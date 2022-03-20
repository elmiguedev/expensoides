import { Column, Connection, createConnection, Entity, getConnection, PrimaryGeneratedColumn } from "typeorm";
import { Apartment } from "../../../domain/apartments/Apartment";
import { ApartmentRepository } from "../../../domain/apartments/ApartmentRepository";

export class PostgresApartmentRepository implements ApartmentRepository {

    public async add(apartment: Apartment): Promise<void> {
        try {
            const repository = this.getApartmentRepository();
            await repository.save(apartment);
        } catch (error) {
            throw new Error(error);
        }
    }

    public async getAll(): Promise<Apartment[]> {
        try {
            const repository = await this.getApartmentRepository();
            return repository.find();
        } catch (error) {
            throw new Error(error);
        }
    }

    public async getById(id: number): Promise<Apartment> {
        try {
            const repository = await this.getApartmentRepository();
            return repository.findOne(id);
        } catch (error) {
            throw new Error(error);
        }
    }

    public async getByBuildingId(buildingId: number): Promise<Apartment[]> {
        try {
            const repository = await this.getApartmentRepository();
            return await repository.find({
                where: {
                    buildingId: buildingId
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    private getApartmentRepository() {
        return getConnection().getRepository(ApartmentDao);
    }

}

@Entity({ name: "Apartment" })
export class ApartmentDao implements Apartment {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column()
    buildingId: number;
    @Column()
    floor: number;
    @Column()
    owner: string;
    @Column()
    number: number;
}