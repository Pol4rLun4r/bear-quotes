// types
import type { Database } from "better-sqlite3";
import type { QuotationType } from "../db/schema";

export type QuotationQuery = Omit<
    QuotationType,
    "id" | "created_at" | "updated_at"
>;

export const createQuotationRepository = (db: Database) => ({ ...data }: QuotationQuery) => {
    // get quotation id
    const quotation = db.prepare(`
        INSERT INTO quotations (client_id, status)
        VALUES (?, ?)
    `).run(data.client_id, data.status);

    return quotation.lastInsertRowid as number;
};

export const getQuotationByIdRepository = (db: Database) => (id: number) => {
    // get quotation by id
    const quotation = db.prepare(`
        SELECT * FROM quotations WHERE id = ? LIMIT 1
    `).get(id);

    return quotation as QuotationType | undefined;
};

export const getAllQuotationsRepository = (db: Database) => {
    // get all quotations
    const quotations = db.prepare(`
        SELECT * FROM quotations
    `).all();

    return quotations as QuotationType[] | undefined;
}