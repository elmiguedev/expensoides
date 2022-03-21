import { createConnection } from "typeorm";
import { ApartmentDao } from "../services/apartments/PostgresApartmentRepository";
import { BuildingDao, ExpenseDetailDao } from "../services/building/PostgresBuildingRepository";
import { ExpenseDao } from "../services/expenses/PostgresExpenseRepository";
import { TransactionDao } from "../services/transactions/PostgresTransactionRepository";

export class PostgresConnection {
    public async connect() {

        await createConnection({
            type: "postgres",
            database: process.env.DB_DATABASE,
            host: process.env.DB_HOSTNAME,
            username: "root",
            password: "3xp3n501d35",
            port: 9001,
            entities: [
                BuildingDao,
                ExpenseDetailDao,
                ApartmentDao,
                ExpenseDao,
                TransactionDao,
            ],
            logging: false,
            synchronize: false,
        });
    }
}