import { Column, Connection, createConnection, Entity, getConnection, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Apartment } from "../../../domain/apartments/Apartment";
import { ApartmentRepository } from "../../../domain/apartments/ApartmentRepository";
import { Building } from "../../../domain/building/Building";
import { BuildingDao } from "../building/PostgresBuildingRepository";
import { ExpenseDao } from "../expenses/PostgresExpenseRepository";

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
    floor: number;
    @Column()
    owner: string;
    @Column()
    number: number;
    @Column()
    buildingId: number;
    @ManyToOne(() => BuildingDao, building => building.apartments)
    building?: BuildingDao;
    @OneToMany(() => ExpenseDao, expense => expense.apartment)
    expenses?: ExpenseDao[];
}