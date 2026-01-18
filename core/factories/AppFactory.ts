// types
import type { DB } from "../db/connection";
import type { QuotationInput } from "../repositories/quotation.repository";
import type { ClientInput } from "../repositories/client.repository";

// services
import createQuotationService from "../services/quotation.service"

// repositories
import { getQuotationByIdRepository, getAllQuotationsRepository, createQuotationRepository } from "../repositories/quotation.repository";
import { createClientRepository, getClientByIdRepository } from "../repositories/client.repository";

export const createAppServices = (db: DB) => ({
    createQuotation: createQuotationService(db),
});

export const createAppQueries = (db: DB) => ({
    // quotations
    getQuotationById: (id: number) => getQuotationByIdRepository(db)(id),
    getAllQuotations: () => getAllQuotationsRepository(db),
    createQuotation: (data: QuotationInput) => createQuotationRepository(db)(data),

    // clients
    createClient: (data: ClientInput) => createClientRepository(db)(data),
    getClientById: (id: number) => getClientByIdRepository(db)(id),
})