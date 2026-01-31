// types
import type { Database } from "better-sqlite3";
import type { ClientType } from "../db/schema";

export type ClientQuery = Omit<
    ClientType,
    "id" | "created_at" | "updated_at"
>;

export const createClientRepository = (db: Database) => ({ ...data }: ClientQuery) => {
    // check or insert client
    const clientId = db.prepare(`
        INSERT INTO clients (name, document, type_client, notes)
        VALUES (?, ?, ?, ?) 
    `).run(data.name, data.document, data.type_client, data.notes);

    return clientId.lastInsertRowid;
}

export const getClientByNameAndDocumentRepository = (db: Database) => (name: string | undefined, document: string | undefined) => {
    // get client by name and document
    const client = db.prepare(`
        SELECT *
        FROM clients
        WHERE name = ? AND document = ?
        LIMIT 1
    `).get(name, document) as ClientType | undefined;

    return client;
}

export const getClientByIdRepository = (db: Database) => (id?: number) => {
    // get client by id
    const client = db.prepare(`
        SELECT *
        FROM clients
        WHERE id = ?
        LIMIT 1
    `).get(id) as ClientType | undefined;

    return client;
}