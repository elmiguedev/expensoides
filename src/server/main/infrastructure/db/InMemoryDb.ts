import { Apartment } from "../../domain/apartments/Apartment";
import { Building } from "../../domain/building/Building";
import { Expense } from "../../domain/expenses/Expense";
import { Transaction } from "../../domain/transactions/Transaction";
import { User } from "../../domain/users/User";

export class InMemoryDb {
  public users: User[];
  public transactions: Transaction[];
  public expenses: Expense[];
  public buildings: Building[];
  public apartments: Apartment[];

  private static instance: InMemoryDb;
  private constructor() {
    this.users = [];
    this.transactions = [];
    this.expenses = [];
    this.buildings = [];
    this.apartments = [];
  }

  public static getInstance() {
    if (!this.instance)
      this.instance = new InMemoryDb();

    return this.instance;
  }

}