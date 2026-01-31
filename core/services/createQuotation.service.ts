// types
import type { Database } from "better-sqlite3";
import type { createQuotationType } from "../domain/createQuotation.rules"

// repositores
import { createClientRepository, getClientByIdRepository, getClientByNameAndDocumentRepository } from "../repositories/client.repository"
import { createQuotationRepository } from "../repositories/quotation.repository";

// rules
import createQuotationRules from "../domain/createQuotation.rules";
import { success } from "../utils/handleSuccess";

const createQuotationService = (db: Database) =>
    db.transaction((data: createQuotationType) => {
        // queries
        const createClient = createClientRepository(db);
        const getClientByNameAndDoc = getClientByNameAndDocumentRepository(db);
        const getClientById = getClientByIdRepository(db);
        const createQuotation = createQuotationRepository(db);

        // Check if client exists
        const clientIdExists = getClientById(data.client_id)?.id;
        const clientExists = getClientByNameAndDoc(data.name, data.document)?.id;

        // Apply rules
        const rulesResult = createQuotationRules({ ...data, clientIdExists, clientExists });

        // Check rules result
        if (!rulesResult.success) {
            return rulesResult as Omit<typeof rulesResult, "code"> // failure
        }

        if (rulesResult.code === "CLIENT_EXISTS") {
            const { client_id, status } = rulesResult.data;
            const quotation = createQuotation({ ...data, client_id, status });
            return success(quotation);
        }

        const { name, document, type_client, status, notes } = rulesResult.data;
        const newClient = createClient({ name, document, type_client, notes });
        const quotation = createQuotation({ client_id: newClient as number, status: status });
        return success(quotation) as Omit<typeof rulesResult, "code">;
    });

export default createQuotationService;