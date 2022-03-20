import { createConnection } from "typeorm";
import { ApartmentDao } from "../services/apartments/PostgresApartmentRepository";
import { BuildingDao, ExpenseDetailDao } from "../services/building/PostgresBuildingRepository";

export class PostgresConnection {
    constructor() {

    }

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
            synchronize: true,
        });

    }
}