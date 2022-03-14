import { Column, createConnection, Entity, getConnection, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Building } from "../../../domain/building/Building";
import { BuildingRepository } from "../../../domain/building/BuildingRepository";
import { ExpenseDetail } from "../../../domain/expenses/ExpenseDetail";

export class SqliteBuildingRepository implements BuildingRepository {

    private async getRepository() {
        const conn = getConnection();
        return conn.getRepository(BuildingDao);
    }

    async add(): Promise<void> {
        const repository = await this.getRepository();
        await repository.save({
            address: "Prueba",
            admin: "Prueba",
            cuit: "prueba",
            name: "Pruebita",
            expenses: [
                {
                    description: "Expensa ordinaria",
                    mount: 2000
                }
            ]
        })
    }

    async getExpensesMount(id: number): Promise<number> {
        const repository = await this.getRepository();
        const building = await this.getById(id);
        let total = 0;
        building.expenses.forEach(detail => {
            total += detail.mount
        });
        return Promise.resolve(total);
    }

    async getById(id: number): Promise<Building> {
        const repository = await this.getRepository();
        return repository.findOne(id);
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

    @OneToMany(type => ExpenseDetailDao, detail => detail, { cascade: true })
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

