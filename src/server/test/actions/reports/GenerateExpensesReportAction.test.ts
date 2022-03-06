import fs from "fs";
import { GenerateExpensesReportAction } from "../../../main/actions/reports/GenerateExpensesReportAction";
import { InMemoryApartmentRepository } from "../../../main/infrastructure/services/apartments/InMemoryApartmentRepository";
import { InMemoryExpenseRepository } from "../../../main/infrastructure/services/expenses/InMemoryExpenseRepository";
import { PdfReportService } from "../../../main/infrastructure/services/reports/PdfReportService";

describe("Generate expenses report action", () => {

    test("should generate a PDF file ", async () => {
        const expenseRepository = getExpenseRepository();
        const apartmentRepository = getApartmentRepository();
        const reportService = getReportService();

        await apartmentRepository.add({
            floor: 1,
            number: 1,
            owner: "Pepe argento"
        });

        await expenseRepository.add({
            apartmentId: 0,
            description: "Prueba",
            month: 2,
            mount: 2000,
            paid: true,
            year: 2022
        })

        const action = new GenerateExpensesReportAction(
            expenseRepository,
            apartmentRepository,
            reportService
        );

        const expenseId = 0;
        console.log("BANDERIN")
        const filePath = await action.execute({ expenseId });

        console.log("EL PAATH", filePath);

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