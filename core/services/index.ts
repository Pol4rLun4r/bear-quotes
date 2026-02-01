import type { Database } from "better-sqlite3";

import { createClientRepository, getClientByIdRepository, getClientByNameAndDocumentRepository } from "../repositories/client.repository";
import { createQuotationRepository, getAllQuotationsRepository, getQuotationByIdRepository } from "../repositories/quotation.repository";

export const createRepositories = (db: Database) => ({
    client: {
        create: createClientRepository(db),
        getById: getClientByIdRepository(db),
        getByNameAndDocument: getClientByNameAndDocumentRepository(db),
    },
    quotation: {
        create: createQuotationRepository(db),
        getAll: getAllQuotationsRepository(db),
        getById: getQuotationByIdRepository(db),
    }
});

export type Repositories = ReturnType<typeof createRepositories>;