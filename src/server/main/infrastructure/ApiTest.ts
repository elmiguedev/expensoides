import { createConnection, getConnection } from "typeorm";
import { SqliteApartmentRepository } from "./services/apartments/SqliteApartmentRepository";
import { BuildingDao, ExpenseDetailDao, SqliteBuildingRepository } from "./services/building/SqliteBuildingRepository";


const start = async () => {

    await createConnection({
        type: "sqlite",
        database: "./db/sqlite/expensoides.db",
        entities: [BuildingDao, ExpenseDetailDao],
        logging: false,
        synchronize: true,
    });

    const buildingRepository = new SqliteBuildingRepository();
    await buildingRepository.add();

    const b = await buildingRepository.getById(2);
    console.log(b);

    getConnection().close()
}


start();