export interface Expense {
  id?: number;
  createdDate?: Date;
  apartmentId: number;
  year: number;
  month: number;
  mount: number;
  description: string;
  paid: boolean;
}