// types
import type { DB } from "../db/connection"
import type { ClientInput } from "../repositories/client.repository"

import createClientRepository from "../repositories/client.repository"

const createClientService = (db: DB) =>
    ({ name, document, type_client, notes }: ClientInput) => {

        const createClient = createClientRepository(db);

        if (type_client !== "Nacional" && type_client !== "Internacional") {
            throw new Error("Invalid client type");
        }

        if (!name || !document) {
            throw new Error("Name and Document are required")
        }

        return createClient({ name, document, type_client, notes });
    }

export default createClientService;