import { Column, createConnection, Entity, getConnection, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Building } from "../../../domain/building/Building";
import { BuildingRepository } from "../../../domain/building/BuildingRepository";
import { ExpenseDetail } from "../../../domain/expenses/ExpenseDetail";

export class PostgresBuildingRepository implements BuildingRepository {

    public async add(building: Building): Promise<void> {
        try {
            const repository = getConnection().getRepository(BuildingDao);
            await repository.save(building);
        } catch (error) {
            throw new Error(error);
        }
    }

    public async getExpensesMount(id: number): Promise<number> {
        try {
            const repository = getConnection().getRepository(BuildingDao);
            const building = await this.getById(id);
            let total = 0;
            building.expenses.forEach(detail => {
                total += detail.mount
            });

            return total;
        } catch (error) {
            throw new Error(error);
        }
    }

    public async getById(id: number): Promise<Building> {
        try {
            const repository = getConnection().getRepository(BuildingDao);
            return repository.findOne(id, { relations: ["expenses"] });
        } catch (error) {
            throw new Error(error);
        }
    }

}

@Entity({ name: "Building" })
export class BuildingDao implements Building {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    address: string;
    @Column()
    cuit: string;
    @Column()
    admin: string;

    @ManyToMany(type => ExpenseDetailDao, detail => detail.id, { cascade: true })
    @JoinTable()
    expenses: ExpenseDetailDao[];
}

@Entity({ name: "ExpenseDetail" })
export class ExpenseDetailDao implements ExpenseDetail {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    description: string;
    @Column()
    mount: number;

}

