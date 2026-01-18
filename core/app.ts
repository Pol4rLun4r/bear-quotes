// database
import { createDatabase } from "./db/connection"

// Factories
import { createAppServices, createAppQueries } from "./factories/AppFactory"

const createApp = (config: { dbPath: string }) => {
    const db = createDatabase({ ...config });

    return {
        createAppServices: createAppServices(db),
        createAppQueries: createAppQueries(db),
    }
}

export default createApp;