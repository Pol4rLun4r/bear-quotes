// database
import type { Database as DatabaseType } from "better-sqlite3";

export type ClientCategory = "Nacional" | "Internacional";

export type ClientType = {
    id: number;
    name?: string;
    document?: string;
    type_client?: ClientCategory;
    notes?: string | null;
    created_at: string;
    updated_at: string;
}

export type QuotationType = {
    id: number;
    client_id?: number;
    status?: 0 | 1 | 2;
    created_at: string;
    updated_at: string;
}

export const ApplySchema = (db: DatabaseType) => {
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

    db.prepare(`
        CREATE TABLE IF NOT EXISTS quotations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            client_id INTEGER NOT NULL,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
            
            status INTEGER NOT NULL
                CHECK (status IN (0, 1, 2))
                DEFAULT 0,

            FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
        );
    `).run();
};