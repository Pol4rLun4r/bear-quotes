import * as Database from "better-sqlite3";
import type { Database as DatabaseType } from "better-sqlite3";
import { ApplySchema } from "./schema";

type DB = DatabaseType;

export const createDatabase = (dbPath: string): DatabaseType => {
    const db = new Database.default(dbPath)

    db.pragma("foreign_keys = ON");
    ApplySchema(db);
    
    return db;
}