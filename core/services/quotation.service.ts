// types
import type { DB } from "../db/connection"
import type { QuotationInput } from "../repositories/quotation.repository"
import type { ClientInput } from "../repositories/client.repository"

// repositories
import { createClientRepository, getClientByIdRepository } from "../repositories/client.repository"
import { createQuotationRepository, getQuotationByIdRepository } from "../repositories/quotation.repository";

// utils
import { validateDocument } from "../utils/documentValidator";

export interface QuotationService extends QuotationInput, ClientInput { }

const createQuotationService = (db: DB) => {
    const createQuotationWithClient = db.transaction(({ name, document, type_client, notes, status, client_id }: QuotationService) => {

        const createClient = createClientRepository(db);
        const createQuotation = createQuotationRepository(db);
        const getClientById = getClientByIdRepository(db);
        const getQuotationById = getQuotationByIdRepository(db);

        const DEFAULT_STATUS = 0;

        const createQuotationForClient = (clientId: number | undefined, status?: 0 | 1 | 2) => {
            const quotationId = createQuotation({ client_id: clientId, status: status ?? DEFAULT_STATUS });
            return getQuotationById(quotationId);
        };

        // Validate existing client ID
        if (client_id) {
            const existingClient = getClientById(client_id);
            if (!existingClient) {
                throw new Error("Client ID does not exist");
            }

            return createQuotationForClient(client_id, status);
        }

        // validate client type
        if (type_client !== "Nacional" && type_client !== "Internacional") {
            throw new Error("Invalid client type");
        }

        // Validate name and document presence for new client creation
        if (name && document) {
            // Validate document format
            if (!validateDocument(document)) {
                throw new Error("Invalid document format. Must be a valid CPF or CNPJ");
            }

            const clientId = createClient({ name, document, type_client, notes });

            return createQuotationForClient(clientId.id, status);
        }

        // Nenhuma opção válida
        throw new Error("Provide either name/document to create client, or existing client_id");
    });

    return createQuotationWithClient;
};

export default createQuotationService;