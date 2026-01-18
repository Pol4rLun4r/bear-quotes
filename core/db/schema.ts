import type { Database } from "better-sqlite3";

export type ClientCategory = "Nacional" | "Internacional";

export type ClientType = {
    id: number;
    name: string;
    document: string;
    type_client: ClientCategory;
    notes?: string | null;
    created_at: string;
    updated_at: string;
}

export const ApplySchema = (db: Database) => {
    db.prepare(`
        CREATE TABLE IF NOT EXISTS clients (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            document TEXT NOT NULL,
            notes TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            updated_at TEXT DEFAULT CURRENT_TIMESTAMP,

            type_client TEXT NOT NULL
            CHECK (type_client IN ('Nacional', 'Internacional'))
            DEFAULT 'Nacional',

            UNIQUE (name, document)
        );
    `).run();
}