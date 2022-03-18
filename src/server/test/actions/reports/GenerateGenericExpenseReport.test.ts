import fs from "fs";
import { GenerateGenericExpenseReportAction } from "../../../main/actions/reports/GenerateGenericExpenseReport";
import { PdfReportService } from "../../../main/infrastructure/services/reports/PdfReportService";

describe("Generate generic expenses report action", () => {

  test("should generate a PDF file ", async () => {
    const reportService = getReportService();
    const action = new GenerateGenericExpenseReportAction(
      reportService
    );

    const filePath = await action.execute({
      owner: "PEPE ARGENTO",
      apartment: "PH 1",
      expenseId: 2316,
      month: 3,
      year: 2022,
      paymentDate: new Date('2022-03-16 13:00:00'),
      paymentType: "cash",
      total: 2000,
      building: "LOGO 1",
      address: "12 de Octubre 1475",
      cuit: "30-70710290-6",
      detail: [
        {
          description: "Expensas comunes",
          mount: 1800
        },
        {
          description: "Expensas extraordinarias",
          mount: 200
        },
        // {
        //   description: "Cuota Pintura 1/4",
        //   mount: 10000
        // },
      ]
    });

    expect(fs.existsSync(filePath)).toBe(true);
  })

});

const getReportService = () => {
  return new PdfReportService();
}
