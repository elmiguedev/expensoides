import { createConnection, getConnection } from "typeorm";
import { SqliteApartmentRepository } from "./services/apartments/SqliteApartmentRepository";
import { BuildingDao, ExpenseDetailDao, SqliteBuildingRepository } from "./services/building/SqliteBuildingRepository";


const start = async () => {

    await createConnection({
        type: "postgres",
        database: "expensoides",
        host: "143.244.176.130",
        username: "root",
        password: "3xp3n501d35",
        port: 9001,
        entities: [BuildingDao, ExpenseDetailDao],
        logging: false,
        synchronize: true,
    });

    const buildingRepository = new SqliteBuildingRepository();
    // await buildingRepository.add();

    const b = await buildingRepository.getById(4);
    console.log(b);

    getConnection().close()
}


start();