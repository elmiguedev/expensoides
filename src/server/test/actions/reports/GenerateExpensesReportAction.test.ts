import fs from "fs";
import { GenerateExpensesReportAction } from "../../../main/actions/reports/GenerateExpensesReportAction";
import { InMemoryApartmentRepository } from "../../../main/infrastructure/services/apartments/InMemoryApartmentRepository";
import { InMemoryBuildingRepository } from "../../../main/infrastructure/services/building/InMemoryBuildingRepository";
import { InMemoryExpenseRepository } from "../../../main/infrastructure/services/expenses/InMemoryExpenseRepository";
import { PdfReportService } from "../../../main/infrastructure/services/reports/PdfReportService";

describe("Generate expenses report action", () => {

    test("should generate a PDF file ", async () => {
        const expenseRepository = getExpenseRepository();
        const apartmentRepository = getApartmentRepository();
        const buildingRepository = getBuildingRepository();
        const reportService = getReportService();

        await apartmentRepository.add({
            buildingId: 1,
            floor: 1,
            number: 1,
            owner: "Pepe argento"
        });

        await expenseRepository.add({
            apartmentId: 0,
            description: "Expensas de prueba",
            month: 2,
            paid: true,
            paymentDate: new Date(),
            year: 2022,
            detail: [
                { description: "Expensas comunes", mount: 1800 },
                { description: "Expensas extraordinarias", mount: 200 },
            ]
        })

        const action = new GenerateExpensesReportAction(
            expenseRepository,
            apartmentRepository,
            buildingRepository,
            reportService
        );

        const expenseId = 0;
        const filePath = await action.execute({ expenseId });

        expect(fs.existsSync(filePath)).toBe(true);
    })

});

const getExpenseRepository = () => {
    return new InMemoryExpenseRepository();
}

const getApartmentRepository = () => {
    return new InMemoryApartmentRepository();
}

const getReportService = () => {
    return new PdfReportService();
}

const getBuildingRepository = () => {
    return new InMemoryBuildingRepository();
}