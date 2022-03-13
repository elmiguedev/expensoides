export interface MonthReportData {
  building: string;
  address: string;
  currentPeriod: string;
  nextPeriod: string;
  lastPeriod: string;
  lastTotalMount: number;
  currentTotalEarnings: number;
  currentTotalPayments: number;
  currentTotalMount: number;
  expenses: MonthReportDataExpense[],
  payments: MonthReportDataPayment[],
  nextExpenses: MonthReportDatNextExpense[],
  adminCbu: string;
  adminAlias: string;
  adminName: string;
  adminPhone: string;
}

export interface MonthReportDataExpense {
  date: string;
  id: string;
  apartment: string;
  description: string;
  mount: number;
}

export interface MonthReportDataPayment {
  date: string;
  description: string;
  mount: number;
}

export interface MonthReportDatNextExpense {
  apartment: string;
  owner: string;
  mount: number;
}