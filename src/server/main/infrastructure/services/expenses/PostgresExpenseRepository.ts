import { Column, Entity, getConnection, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Expense } from "../../../domain/expenses/Expense";
import { ExpenseRepository } from "../../../domain/expenses/ExpenseRepository";
import { ExpenseDetailDao } from "../building/PostgresBuildingRepository";

export class PostgresExpenseRepository implements ExpenseRepository {

    public async getExpense(apartmentId: number, year: number, month: number): Promise<Expense> {
        try {
            const repository = this.getExpenseRepository();
            return repository.findOne({
                where: {
                    apartmentId: apartmentId,
                    year: year,
                    month: month
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    public async add(expense: Expense): Promise<Expense> {
        try {
            const repository = this.getExpenseRepository();
            return repository.save(expense);
        } catch (error) {
            throw new Error(error);
        }
    }

    public async getAll(): Promise<Expense[]> {
        try {
            const repository = this.getExpenseRepository();
            return repository.find();

        } catch (error) {
            throw new Error(error);
        }
    }

    public async getUnpaidByApartment(apartmentId: number): Promise<Expense[]> {
        try {
            const repository = this.getExpenseRepository();
            return repository.find({
                where: {
                    apartmentId: apartmentId,
                    paid: false
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    public async getById(id: number): Promise<Expense> {
        try {
            const repository = this.getExpenseRepository();
            return repository.findOne({
                where: {
                    id: id
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    public async markAsPaid(id: number, transactionId: number): Promise<Expense> {
        try {
            const repository = this.getExpenseRepository();
            const expense = await this.getById(id);

            expense.paid = true;
            expense.transactionId = transactionId;
            expense.paymentDate = new Date();

            return repository.save(expense);
        } catch (error) {
            throw new Error(error);
        }
    }

    public async getByPeriod(month: number, year: number): Promise<Expense[]> {
        try {
            const repository = this.getExpenseRepository();
            return repository.find({
                where: {
                    year,
                    month
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    private getExpenseRepository() {
        return getConnection().getRepository(ExpenseDao);
    }
}

@Entity({ name: "Expense" })
export class ExpenseDao implements Expense {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column({ type: 'timestamptz' })
    createdDate?: Date;
    @Column()
    apartmentId: number;
    @Column()
    year: number;
    @Column()
    month: number;
    @Column()
    description: string;
    @Column()
    paid: boolean;
    @Column()
    transactionId?: number;
    @Column()
    paymentDate?: Date;
    @ManyToMany(type => ExpenseDetailDao, detail => detail.id, { cascade: true })
    @JoinTable()
    detail: ExpenseDetailDao[];

}