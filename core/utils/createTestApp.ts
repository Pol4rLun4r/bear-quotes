import * as Database from "better-sqlite3";
import { createApp } from "../app";
import { ApplySchema } from "../db/schema";

export const createTestApp = () => {
    const db = new Database.default(":memory:");

    db.pragma("foreign_keys = ON");
    ApplySchema(db);

    const app = createApp(db);
    return { app, db };
}