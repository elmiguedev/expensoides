export class GenerateExpensesReportAction {
    

    public execute(data:ActionData) : Promise<string> {
        return Promise.resolve("path.pdf");
    }

}

interface ActionData {
    expenseId: number;
}