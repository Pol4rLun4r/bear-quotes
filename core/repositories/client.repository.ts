// types
import type { DB } from "../db/connection";
import type { ClientType } from "../db/schema";

export type ClientInput = Omit<
    ClientType,
    "id" | "created_at" | "updated_at"
>;

export const createClientRepository = (db: DB) => ({ ...data }: ClientInput) => {
    // check or insert client
    db.prepare(`
        INSERT OR IGNORE INTO clients (name, document, type_client, notes)
        VALUES (?, ?, ?, ?) 
    `).run(data.name, data.document, data.type_client, data.notes);

    // get client id
    const client = db.prepare(`
        SELECT id
        FROM clients
        WHERE name = ? AND document = ?
        LIMIT 1
    `).get(data.name, data.document) as ClientType

    return client;
}

export const getClientByIdRepository = (db: DB) => (id: number) => {
    // get client by id
    const client = db.prepare(`
        SELECT *
        FROM clients
        WHERE id = ?
        LIMIT 1
    `).get(id) as ClientType | undefined;

    return client;
}