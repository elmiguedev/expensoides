import fs from "fs";
import { GenerateExpensesReportAction } from "../../../main/actions/reports/GenerateExpensesReportAction";

describe("Generate expenses report action", () => {

    test("should generate a PDF file ", async () => {
        const action = new GenerateExpensesReportAction();
    
        const expenseId = 1;

        const filePath = await action.execute({expenseId});

        expect(fs.existsSync(filePath)).toBe(true);
    })

})