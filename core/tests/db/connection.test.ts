import { createDatabase } from "../../db/connection";

describe("Database connection", () => {
    // Inicializa o banco de dados em memória para testes
    const db = createDatabase(":memory:");

    // Teste básico para verificar se o banco foi criado e schema aplicado
    it("should create database and apply schema", () => {
        // 1. Execute a query para listar tabelas
        const tables = db
            .prepare(`
                SELECT name FROM sqlite_master WHERE type='table'
            `).all();

        // 2. Extraia os nomes das tabelas
        const tableNames = tables.map((t: any) => t.name);

        // 3. Valide o resultado
        expect(tableNames.length).toBeGreaterThan(1);     // Deve ter pelo menos uma tabela
        expect(tableNames).toContain("clients");          // Deve conter a tabela 'clients'
    });
});