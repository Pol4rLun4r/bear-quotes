// types
import type { DB } from "../db/connection";
import type { QuotationType } from "../db/schema";

export type QuotationInput = Omit<
    QuotationType,
    "id" | "created_at" | "updated_at"
>;

export const createQuotationRepository = (db: DB) => ({ ...data }: QuotationInput) => {
    // get quotation id
    const quotation = db.prepare(`
        INSERT INTO quotations (client_id, status)
        VALUES (?, ?)
    `).run(data.client_id, data.status);

    return quotation.lastInsertRowid as number;
};

export const getQuotationByIdRepository = (db: DB) => (id: number) => {
    // get quotation by id
    const quotation = db.prepare(`
        SELECT * FROM quotations WHERE id = ? LIMIT 1
    `).get(id);

    return quotation as QuotationType | undefined;
};

export const getAllQuotationsRepository = (db: DB) => {
    // get all quotations
    const quotations = db.prepare(`
        SELECT * FROM quotations
    `).all();

    return quotations as QuotationType[] | undefined;
}