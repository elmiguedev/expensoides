export default interface Transaction {
    id?: number;
    apartmentId: number;
    mount: number;
    description: string;
    date: Date
}