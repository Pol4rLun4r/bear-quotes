// types
import type { createQuotationType } from "../../domain/createQuotation.rules";

// jest
import request from "supertest";

// api
import { createTestApp } from '../../utils/createTestApp';
import { getQuotationByIdRepository } from "../../repositories/quotation.repository";

describe("POST/ Create Quotation", () => {

    // Teste básico para criar uma cotação com cliente novo
    it('should create a quotation with a new client', async () => {
        const { app, db } = createTestApp();

        // 1. Prepare os dados necessários
        const quotationData: createQuotationType = {
            name: "Maria Oliveira",
            document: "987.654.321-00",
            type_client: "Nacional",
            notes: "Novo cliente para cotação",
            status: 0
        }

        // 2. Chama o serviço para criar a cotação com cliente
        const quotation = await request(app)
            .post("/quotations")
            .send(quotationData)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        const checkQuotation = getQuotationByIdRepository(db)
            (quotation.body.data as number);

        // 3. Verifica se a cotação foi criada corretamente
        expect(checkQuotation).toBeDefined();
    })
})