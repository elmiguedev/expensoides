import path from "path";
import JSONdb from "simple-json-db";

export class JsonDb {
    private db: JSONdb;
    constructor() {
        const url = path.join(__dirname, "./db.json");
        this.db = new JSONdb(url);
    }

    public get<T>(key: string): Array<T> {
        if (!this.db.has(key)) {
            this.db.set(key, []);
            this.db.sync();
        }
        return <Array<T>>this.db.get(key);
    }

    public set<T>(key: string, value: Array<T>): void {
        if (!this.db.has(key)) {
            this.db.set(key, []);
            this.db.sync();
        }
        this.db.set(key, value);
        this.db.sync();

    }
}