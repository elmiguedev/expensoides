import fs from "fs";
import { GenerateMonthReportAction } from "../../../main/actions/reports/GenerateMonthReportAction";
import { InMemoryApartmentRepository } from "../../../main/infrastructure/services/apartments/InMemoryApartmentRepository";
import { InMemoryBuildingRepository } from "../../../main/infrastructure/services/building/InMemoryBuildingRepository";
import { InMemoryExpenseRepository } from "../../../main/infrastructure/services/expenses/InMemoryExpenseRepository";
import { PdfReportService } from "../../../main/infrastructure/services/reports/PdfReportService";
import { InMemoryTransactionRepository } from "../../../main/infrastructure/services/transactions/InMemoryTransactionRepository";

describe("Generate monthly report action", () => {

    test("should generate a PDF file ", async () => {
        const reportService = getReportService();
        const transactionRepository = await getTransactionRepository();
        const expenseRepository = await getExpenseRepository();
        const apartmentRepository = await getApartmentRepository();
        const buildingRepository = getBuildingRepository();

        const action = new GenerateMonthReportAction(
            reportService,
            transactionRepository,
            expenseRepository,
            apartmentRepository,
            buildingRepository
        );

        const year = 2022;
        const month = 3;
        const buildingId = 1;

        const filePath = await action.execute({ buildingId, year, month });

        expect(fs.existsSync(filePath)).toBe(true);
    })

})

const getReportService = () => {
    return new PdfReportService();
}

const getBuildingRepository = () => {
    return new InMemoryBuildingRepository();
}

const getApartmentRepository = async () => {
    const apartmentRepository = new InMemoryApartmentRepository();
    await apartmentRepository.add({
        buildingId: 1,
        floor: 1,
        number: 1,
        owner: "Pepe Argento"
    });
    await apartmentRepository.add({
        buildingId: 1,
        floor: 2,
        number: 2,
        owner: "Moni Argento"
    });
    await apartmentRepository.add({
        buildingId: 1,
        floor: 3,
        number: 3,
        owner: "Coki Argento"
    });
    return apartmentRepository;
}

const getExpenseRepository = async () => {
    const repository = new InMemoryExpenseRepository();
    await repository.add({
        apartmentId: 0,
        description: "Expensas ordinarias Marzo 2022",
        detail: [
            {
                description: "Expensas ordinarias",
                mount: 2000
            }
        ],
        month: 3,
        paid: true,
        transactionId: 0,
        year: 2022,
        paymentDate: new Date()
    })
    await repository.add({
        apartmentId: 1,
        description: "Expensas ordinarias Marzo 2022",
        detail: [
            {
                description: "Expensas ordinarias",
                mount: 2000
            }
        ],
        month: 3,
        paid: true,
        transactionId: 1,
        year: 2022,
        paymentDate: new Date()
    })
    await repository.add({
        apartmentId: 2,
        description: "Expensas ordinarias Marzo 2022",
        detail: [
            {
                description: "Expensas ordinarias",
                mount: 2000
            }
        ],
        month: 3,
        paid: true,
        transactionId: 2,
        year: 2022,
        paymentDate: new Date()
    })
    await repository.add({
        apartmentId: 0,
        description: "Expensas ordinarias Abril 2022",
        detail: [
            {
                description: "Expensas ordinarias",
                mount: 2000
            }
        ],
        month: 4,
        paid: false,
        year: 2022
    })
    await repository.add({
        apartmentId: 1,
        description: "Expensas ordinarias Abril 2022",
        detail: [
            {
                description: "Expensas ordinarias",
                mount: 2000
            }
        ],
        month: 4,
        paid: false,
        year: 2022
    })
    await repository.add({
        apartmentId: 2,
        description: "Expensas ordinarias Abril 2022",
        detail: [
            {
                description: "Expensas ordinarias",
                mount: 2000
            }
        ],
        month: 4,
        paid: false,
        year: 2022
    })

    return repository;

}

const getTransactionRepository = async () => {
    const repository = new InMemoryTransactionRepository();
    await repository.add({
        date: new Date(),
        description: "Expensas ordinarias Marzo 2022",
        mount: 2000,
    })
    await repository.add({
        date: new Date(),
        description: "Expensas ordinarias Marzo 2022",
        mount: 2000,
    })
    await repository.add({
        date: new Date(),
        description: "Expensas ordinarias Marzo 2022",
        mount: 2000,
    })
    await repository.add({
        date: new Date(),
        description: "EPEC",
        mount: -730,
    })
    await repository.add({
        date: new Date(),
        description: "Servicio de Limpieza",
        mount: -5000,
    })
    await repository.add({
        date: new Date('2022-02-22'),
        description: "Saldo ingreso",
        mount: 7300,
    })

    return repository;
}
