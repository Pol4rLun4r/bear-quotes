import express from "express";

// routes
import quotationRoutes from "./Routes/quotation.routes";
import type { Database } from "better-sqlite3";

export const createApp = (db: Database) => {
    const app = express();
    
    // middleware
    app.use(express.json());

    // using routes
    app.use("/quotations", quotationRoutes(db));

    return app;
}