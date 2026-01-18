import Database from "better-sqlite3";
import type { Database as DatabaseType } from "better-sqlite3";
import { ApplySchema } from "./schema";

export type DB = DatabaseType;

export type DBConfig = {
    dbPath: string;
}

export const createDatabase = (config: DBConfig): DatabaseType => {
    const db = new Database(config.dbPath)

    db.pragma("foreign_keys = ON");
    ApplySchema(db);
    
    return db;
}