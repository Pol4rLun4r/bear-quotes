// types
import type { QuotationQuery } from "../repositories/quotation.repository";
import type { ClientQuery } from "../repositories/client.repository";

// utils
import { validateDocument } from "../utils/documentValidator";
import { success, failure } from "../utils/handleSuccess";

export interface createQuotationType extends QuotationQuery, ClientQuery { }

interface createQuotationRulesType extends createQuotationType {
    clientIdExists: number | undefined;// client_id exists 
    clientExists: number | undefined; // registered customer exists
}

const createQuotationRules = ({ name, document, type_client, notes, client_id, status, clientIdExists, clientExists }: createQuotationRulesType) => {

    const DEFAULT_STATUS = 0;

    // Validate existing client ID
    if (client_id) {

        if (!clientIdExists) {
            return failure("Client ID does not exist");
        }

        return success({ client_id, status: status ?? DEFAULT_STATUS }, "CLIENT_EXISTS");
    };

    // Check if client already exists
    if (clientExists) {
        return success({ client_id: clientExists, status: status ?? DEFAULT_STATUS }, "CLIENT_EXISTS");
    }

    // Validate name and document presence for new client creation
    if (name && document) {

        // Validate document format
        if (!validateDocument(document)) {
            return failure("Invalid document format. Must be a valid CPF or CNPJ");
        }

        // Validate client type
        if (type_client !== "Nacional" && type_client !== "Internacional") {
            return failure("Invalid client type");
        }

        return success({ name, document, type_client, notes, status: status ?? DEFAULT_STATUS }, "NEW_CLIENT");
    };

    // No valid options
    return failure("Provide either name/document to create client, or existing client_id");
};

export default createQuotationRules;