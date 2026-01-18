import { createDatabase } from "./db/connection"
import createClientService from "./services/client.service";

const createApp = (config: { dbPath: string }) => {
    const db = createDatabase({ ...config });

    const clientService = createClientService(db);

    return {
        clientService
    }
}

export default createApp;