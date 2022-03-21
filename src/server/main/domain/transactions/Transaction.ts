import { Building } from "../building/Building";

export interface Transaction {
    id?: number;
    mount: number;
    description: string;
    date: Date;
    buildingId?: number;
    building?: Building;
}