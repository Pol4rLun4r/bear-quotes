// types
import type { QuotationService } from "../../services/quotation.service";
import type { ClientInput } from "../../repositories/client.repository";

// app
import createApp from "../../app";

describe("createQuotation", () => {

    // Inicializa a app com um banco de dados em memória para testes
    const app = createApp({ dbPath: ":memory:" });

    const service = app.createAppServices;;
    const queries = app.createAppQueries;

    // Teste básico para criar uma cotação com cliente novo
    it("should create a quotation with a new client", () => {

        // 1. Prepare os dados necessários
        const quotationData: QuotationService = {
            name: "Maria Oliveira",
            document: "987.654.321-00",
            type_client: "Nacional",
            notes: "Novo cliente para cotação",
            status: 0
        };

        // 2. Chama o serviço para criar a cotação com cliente
        const quotation = service.createQuotation(quotationData);

        // 3. Valida o resultado e checa se a cotação foi criada
        expect(quotation).toBeDefined();                 // Verifica se retorna algo
        expect(typeof quotation?.id).toBe("number");     // Verifica se o ID é um número
        expect(quotation).toStrictEqual(queries.getQuotationById(quotation?.id as number)); // verifica se os dados sãos os mesmos
    });

    // Teste para criar uma cotação com cliente existente
    it("should create a quotation with an existing client", () => {

        // 1. Primeiro, cria um cliente para usar na cotação
        const clientData: ClientInput = {
            name: "Carlos Pereira",
            document: "123.456.789-00",
            type_client: "Nacional",
            notes: "Cliente existente",
        };

        // 2. Cria o cliente
        const client = queries.createClient(clientData);

        // 3. Prepara os dados da cotação usando o ID do cliente existente
        const quotationData: QuotationService = {
            client_id: client.id,
            status: 1
        };

        // 4. Chama o serviço para criar a cotação com o cliente existente
        const quotation = service.createQuotation(quotationData);

        // 5. Valida o resultado e checa se a cotação foi criada
        expect(quotation).toStrictEqual(queries.getQuotationById(quotation?.id as number)) // Valida se os dados são os mesmos
    });

    // Testa para falhar caso o Client ID não exista

    it("should fail to create a quote when the client id does not exist", () => {

        // 1. Prepara os dados da cotação usando o id que não existe,
        const quotationData: QuotationService = {
            client_id: 9999,
            status: 0
        };

        // 2. Valida se o erro foi lançado
        expect(() => service.createQuotation(quotationData)).toThrow("Client ID does not exist") // Verifica se o erro esperado foi lançado
    });

    it("should fail to create a quote when name are missing for new client", () => {

        // 1. Prepara os dados da cotação sem o nome 
        const quotationData: QuotationService = {
            document: "123.456.789-00",
            type_client: "Nacional",
            notes: "Cliente novo",
        }

        // 2. Valida se o erro foi lançado
        expect(() => service.createQuotation(quotationData)).toThrow("Provide either name/document to create client, or existing client_id"); // Verifica se o erro esperado foi lançado
    });

    it("should fail to create a quote when document are missing for new client", () => {

        // 1. Prepara os dados da cotação sem o documento 
        const quotationData: QuotationService = {
            name: "Aílson mendes",
            type_client: "Nacional",
            notes: "Cliente novo",
        }

        // 2. Valida se o erro foi lançado
        expect(() => service.createQuotation(quotationData)).toThrow("Provide either name/document to create client, or existing client_id"); // Verifica se o erro esperado foi lançado
    });

    it("should fail to create a quote when document format is invalid for new client", () => {

        // 1. Prepara os dados da cotação com documento inválido
        const quotationData: QuotationService = {
            name: "Aílson mendes",
            document: "invalid-document",
            type_client: "Nacional",
            notes: "Cliente novo",
        }

        // 2. Valida se o erro foi lançado
        expect(() => service.createQuotation(quotationData)).toThrow("Invalid document format. Must be a valid CPF or CNPJ"); // Verifica se o erro esperado foi lançado
    });
});