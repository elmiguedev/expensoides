import { Column, Connection, createConnection, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Apartment } from "../../../domain/apartments/Apartment";
import { ApartmentRepository } from "../../../domain/apartments/ApartmentRepository";

export class SqliteApartmentRepository implements ApartmentRepository {

    constructor() {

    }

    private async getConnection() {
        return createConnection({
            type: "sqlite",
            database: "../../db/sqlite/expensoides.db",
            entities: [ApartmentDao],
            logging: true,
            synchronize: true
        });
    }

    private async getRepository() {
        const conn = await this.getConnection();
        return conn.getRepository(ApartmentDao);
    }


    async add(apartment: Apartment): Promise<void> {
        const repository = await this.getRepository();
        await repository.save(apartment);
    }

    async getAll(): Promise<Apartment[]> {
        const repository = await this.getRepository();
        return repository.find();
    }

    async getById(id: number): Promise<Apartment> {
        const repository = await this.getRepository();
        return repository.findOne(id);
    }

    async getByBuildingId(buildingId: number): Promise<Apartment[]> {
        const repository = await this.getRepository();
        return await repository.find({
            where: {
                buildingId: buildingId
            }
        });
    }
}

@Entity({ name: "Apartment" })
class ApartmentDao implements Apartment {
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