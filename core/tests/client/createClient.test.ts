import createApp from "../../app";
import type { ClientInput } from "../../repositories/client.repository";

describe("createClient", () => {
    // Inicializa a app com um banco de dados em memória para testes
    const app = createApp({ dbPath: ":memory:" });

    // Teste básico para criar um cliente com dados válidos
    it("should create a client with valid data", () => {
        // 1. Prepare os dados necessários
        const clientData: ClientInput = {
            name: "João Silva",
            document: "123.456.789-00",
            type_client: "Nacional",
            notes: "Cliente de teste"
        };

        // 2. Chama o serviço para criar o cliente
        const client = app.clientService(clientData);

        // 3. Valida o resultado
        expect(client).toBeDefined();                    // Verifica se o cliente foi criado
        expect(client.id).toBeDefined();                 // Verifica se tem um ID
        expect(typeof client.id).toBe("number");         // Verifica se o ID é um número
    });

    // Teste para verificar erro ao criar cliente sem nome
    it("should throw an error when creating a client without a name", () => {

        // 1. Prepare os dados com nome ausente
        const clientData: ClientInput = {
            name: "",
            document: "123.456.789-00",
            type_client: "Nacional",
            notes: "Cliente sem nome"
        }

        // 2. Valida se o erro foi lançado
        expect(() => app.clientService(clientData)).toThrow("Name and Document are required"); // Verifica a mensagem do erro
    });

        // Teste para verificar erro ao criar cliente sem documento
    it("should throw an error when creating a client without a document", () => {

        // 1. Prepare os dados com documento ausente
        const clientData: ClientInput = {
            name: "nani",
            document: "",
            type_client: "Nacional",
            notes: "Cliente sem nome"
        }

        // 2. Valida se o erro foi lançado
        expect(() => app.clientService(clientData)).toThrow("Name and Document are required"); // Verifica a mensagem do erro
    });

    // Teste para criar o mesmo cliente duas vezes
    it("should not create duplicate clients", () => {

        // 1. Prepare os dados do cliente
        const clientData: ClientInput = {
            name: "Maria Souza",
            document: "987.654.321-00",
            type_client: "Internacional",
            notes: "Cliente duplicado"
        };
        
        // 2. Cria o cliente pela primeira vez
        const firstClient = app.clientService(clientData);

        // 3. Tenta criar o mesmo cliente novamente
        const secondClient = app.clientService(clientData);

        // 4. Valida que ambos os IDs são iguais, indicando que o cliente não foi duplicado
        expect(firstClient.id).toBe(secondClient.id);
    });

    // teste para verificar erro ao criar cliente com tipo inválido
    it("should throw an error when creating a client with an invalid type", () => {

        // 1. Prepare os dados com tipo inválido
        const clientData: ClientInput = {
            name: "Carlos Lima",
            document: "111.222.333-44",
            type_client: "Especial" as any, // Forçando um tipo inválido
            notes: "Cliente com tipo inválido"
        }

        // 2. Valida se o erro foi lançado
        expect(() => app.clientService(clientData)).toThrow("Invalid client type"); // Verifica a mensagem do erro
    });
});