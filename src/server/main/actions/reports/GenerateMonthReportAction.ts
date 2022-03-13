import { Apartment } from "../../domain/apartments/Apartment";
import { ApartmentRepository } from "../../domain/apartments/ApartmentRepository";
import { BuildingRepository } from "../../domain/building/BuildingRepository";
import { Expense } from "../../domain/expenses/Expense";
import { ExpenseRepository } from "../../domain/expenses/ExpenseRepository";
import { ReportService } from "../../domain/report/ReportService";
import { Transaction } from "../../domain/transactions/Transaction";
import { TransactionRepository } from "../../domain/transactions/TransactionRepository";

export class GenerateMonthReportAction {
  private reportService: ReportService;
  private transactionRepository: TransactionRepository;
  private expenseRepository: ExpenseRepository;
  private apartmentRepository: ApartmentRepository;
  private buildingRepository: BuildingRepository;

  constructor(
    reportService: ReportService,
    transactionRepository: TransactionRepository,
    expenseRepository: ExpenseRepository,
    apartmentRepository: ApartmentRepository,
    buildingRepository: BuildingRepository
  ) {
    this.reportService = reportService;
    this.transactionRepository = transactionRepository;
    this.expenseRepository = expenseRepository;
    this.apartmentRepository = apartmentRepository;
    this.buildingRepository = buildingRepository;
  }

  public async execute(data: ActionData): Promise<string> {
    const building = await this.buildingRepository.getById(data.buildingId);
    const transactions = await this.transactionRepository.getByPeriod(data.month, data.year);
    const expenses = await this.expenseRepository.getByPeriod(data.month, data.year);
    const apartments = await this.apartmentRepository.getByBuildingId(data.buildingId);
    const nextExpenses = await this.getNextExpenses(data.month, data.year, apartments);
    const balance = await this.transactionRepository.getBalance();

    const path = await this.reportService.generateMonthReport({
      building: building.name,
      address: building.address,
      currentPeriod: this.getCurrentPeriod(data.month, data.year),
      nextPeriod: this.getNextPeriod(data.month, data.year),
      lastPeriod: this.getLastPeriod(data.month, data.year),
      lastTotalMount: await this.getLastMount(data.month, data.year),
      currentTotalEarnings: this.getCurrentEarningsMount(transactions),
      currentTotalPayments: this.getCurrentPaymentsMount(transactions),
      currentTotalMount: balance,
      expenses: this.getExpensesDetail(expenses, apartments, transactions),
      payments: this.getPayments(transactions),
      nextExpenses: nextExpenses,
      adminCbu: "02020202020202020202020202020202",
      adminAlias: "COSA.COSA.COSA",
      adminName: "Moni Argento",
      adminPhone: "0303456"
    });
    return path;
  }

  private getMonth(month: number) {
    const months = {
      1: "Enero",
      2: "Febrero",
      3: "Marzo",
      4: "Abril",
      5: "Mayo",
      6: "Junio",
      7: "Julio",
      8: "Agosto",
      9: "Septiembre",
      10: "Octubre",
      11: "Noviembre",
      12: "Diciembre"
    }
    return months[month];
  }

  private getCurrentPeriod(month: number, year: number) {
    return `${this.getMonth(month)} ${year}`;
  }

  private getLastPeriod(month: number, year: number) {
    let lastMonth = month - 1;
    let lastYear = year;
    if (lastMonth < 1) {
      lastMonth = 12;
      lastYear -= 1;
    }
    return `${this.getMonth(lastMonth)} ${lastYear}`;
  }

  private getNextPeriod(month: number, year: number) {
    let nextMonth = month + 1;
    let nextYear = year;
    if (nextMonth > 12) {
      nextMonth = 1;
      nextYear += 1;
    }
    return `${this.getMonth(nextMonth)} ${nextYear}`;
  }

  private async getLastMount(month: number, year: number) {
    let lastMonth = month - 1;
    let lastYear = year;

    if (lastMonth < 1) {
      lastMonth = 12;
      lastYear -= 1;
    }

    const transactions = await this.transactionRepository.getByPeriod(lastMonth, lastYear);
    let mount = 0;
    transactions.forEach(transaction => {
      mount += transaction.mount;
    });

    return mount;
  }

  private getCurrentTotalMount(transactions: Transaction[]) {
    let mount = 0;
    transactions.forEach(transaction => {
      mount += transaction.mount;
    });

    return mount;
  }

  private getCurrentEarningsMount(transactions: Transaction[]) {
    let mount = 0;
    transactions.forEach(transaction => {
      if (transaction.mount > 0)
        mount += transaction.mount;
    });

    return mount;
  }

  private getCurrentPaymentsMount(transactions: Transaction[]) {
    let mount = 0;
    transactions.forEach(transaction => {
      if (transaction.mount < 0)
        mount += transaction.mount;
    });

    return Math.abs(mount);
  }

  private getExpensesDetail(expenses: Expense[], apartments: Apartment[], transactions: Transaction[]) {
    const details = [];

    expenses.filter(e => e.paid === true).forEach(expense => {
      const apartment = apartments.find(a => a.id === expense.apartmentId);
      const transaction = transactions.find(t => t.id === expense.transactionId);
      const detail = {
        apartment: apartment.number,
        date: this.getFormatedDate(expense.paymentDate),
        description: expense.description,
        id: expense.id,
        mount: transaction.mount
      }

      details.push(detail);
    });

    return details;
  }

  private getPayments(transactions: Transaction[]) {
    const payments = transactions.filter(t => t.mount < 0);
    return payments.map(t => {
      return {
        date: this.getFormatedDate(t.date),
        description: t.description,
        mount: Math.abs(t.mount)
      }
    })
  }

  private async getNextExpenses(month: number, year: number, apartments: Apartment[]) {
    let nextMonth = month + 1;
    let nextYear = year;
    if (nextMonth > 12) {
      nextMonth = 1;
      nextYear += 1;
    }

    const expenses = await this.expenseRepository.getByPeriod(nextMonth, nextYear);
    const nextExpenses = [];

    expenses.forEach(expense => {
      const apartment = apartments.find(a => a.id === expense.apartmentId);

      nextExpenses.push({
        apartment: apartment.number,
        mount: this.getExpenseMount(expense),
        owner: apartment.owner
      });

    });

    return nextExpenses;
  }

  private getExpenseMount(expense: Expense): number {
    let total = 0;
    expense.detail.forEach(detail => {
      total += detail.mount;
    });
    return Math.abs(total);
  }

  private getFormatedDate(date: Date): string {
    const day = `${(date.getDate())}`.padStart(2, '0');
    const month = `${(date.getMonth() + 1)}`.padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

}

interface ActionData {
  buildingId: number;
  year: number;
  month: number;
}