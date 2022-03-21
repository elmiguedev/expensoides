import { Building } from "../building/Building";
import { Expense } from "../expenses/Expense";

export interface Apartment {
    id?: number;
    floor: number;
    owner: string;
    number: number;
    buildingId: number;
    building?: Building;
    expenses?: Expense[];
}