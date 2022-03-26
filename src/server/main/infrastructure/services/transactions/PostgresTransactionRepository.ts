import { Column, Entity, getConnection, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Building } from "../../../domain/building/Building";
import { Transaction } from "../../../domain/transactions/Transaction";
import { TransactionRepository } from "../../../domain/transactions/TransactionRepository";
import { BuildingDao } from "../building/PostgresBuildingRepository";

export class PostgresTransactionRepository implements TransactionRepository {

    public async add(transaction: Transaction): Promise<Transaction> {
        try {
            const repository = this.getTransactionRepository();
            transaction.buildingId = 1;
            return repository.save(transaction);
        } catch (error) {
            throw new Error(error);
        }
    }

    public async getBalance(): Promise<number> {
        try {
            const repository = this.getTransactionRepository();
            const { sum } = await repository.createQueryBuilder("transaction")
                .select("SUM(transaction.mount)", "sum")
                .getRawOne();
            return sum;
        } catch (error) {
            throw new Error(error);
        }
    }

    public async getAll(): Promise<Transaction[]> {
        try {
            const repository = this.getTransactionRepository();
            return repository.find();
        } catch (error) {
            throw new Error(error);
        }
    }

    public async getById(id: number): Promise<Transaction> {
        try {
            const repository = this.getTransactionRepository();
            return repository.findOne({
                where: {
                    id
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    public async getByPeriod(month: number, year: number): Promise<Transaction[]> {
        try {
            const repository = this.getTransactionRepository();
            return repository.createQueryBuilder("transaction")
                .where(`year(transaction.date) =${year}`)
                .where(`month(transaction.date) =${month - 1}`)
                .getMany();
        } catch (error) {
            throw new Error(error);
        }
    }

    private getTransactionRepository() {
        return getConnection().getRepository(TransactionDao);
    }
}

@Entity("Transaction")
export class TransactionDao implements Transaction {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column()
    mount: number;
    @Column()
    description: string;
    @Column({ type: 'timestamptz' })
    date: Date;

    @Column()
    buildingId?: number;

    @ManyToOne(() => BuildingDao, building => building.transactions)
    building?: BuildingDao;

}