// app/api/pedidos/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Filter, MongoClient, Sort } from "mongodb"; // Seu cliente MongoDB
import { LoginRepo } from "@/repository/login"; // Sua classe de repositório SQLite

// 🛑 IMPORTANTE: Função para ler e decodificar o token do cookie
// Esta função precisa ser a contraparte da 'createSecureSessionToken'
// do seu /api/login/route.ts.
function decodeSessionToken(token: string): { userId: number; mongoConnectionId: number } | null {
    try {
        // No seu projeto real, use JWT.verify ou iron-session.unseal
        const decodedString = Buffer.from(token, 'base64').toString('utf-8');
        return JSON.parse(decodedString);
    } catch (e) {
        console.error("Token inválido ou expirado.");
        return null;
    }
}

const loginRepo = new LoginRepo();
const AUTH_COOKIE_NAME = 'auth_token';

export async function GET(request: NextRequest) {
    let mongoClient: MongoClient | null = null;
    
    try {
        // 1. LER O COOKIE DE AUTENTICAÇÃO
        const authToken = request.cookies.get(AUTH_COOKIE_NAME)?.value;
        
        if (!authToken) {
            return NextResponse.json({ message: "Não autorizado." }, { status: 401 });
        }

        // 2. DESCRIPTOGRAFAR O TOKEN PARA OBTER A CHAVE DE CONEXÃO
        const sessionData = decodeSessionToken(authToken);

        if (!sessionData || !sessionData.mongoConnectionId) {
            return NextResponse.json({ message: "Sessão inválida." }, { status: 401 });
        }

        const { mongoConnectionId, userId } = sessionData;

        // 3. BUSCAR A URI COMPLETA NO SQLITE
        // Usamos o ID da conexão do token para buscar a URI, usuário e senha reais
        // no banco de dados de configuração (SQLite).
        const mongoData = loginRepo.getMongoConnectionData(userId);
        
        if (!mongoData || !mongoData.uri) {
             // 403 - Forbidden se a conexão estiver configurada incorretamente
            return NextResponse.json({ message: "Conexão de dados externa indisponível." }, { status: 403 });
        }

        // 4. CONECTAR AO MONGODB (NO LADO DO SERVIDOR!)
        mongoClient = new MongoClient(mongoData.uri);
        await mongoClient.connect();
        
        const db = mongoClient.db(mongoData.database);

        const { searchParams } = new URL(request.url);

        const mongoFilter: Filter<any> = {};

        const clienteFiltro = searchParams.get('cliente');
        if (clienteFiltro) {
            // Supondo que você queira uma busca case-insensitive no campo 'Cliente.Nome'
            // O uso de $regex pode exigir a criação de índices para melhor performance.
            mongoFilter["Cliente"] = { $regex: clienteFiltro, $options: 'i' }; 
        }

        // 5c. Processar Filtro de Código (Venda)
        const codigoFiltro = searchParams.get('venda');
        if (codigoFiltro) {
            // Assume que o campo no MongoDB é 'Codigo' e deve ser tratado como Number ou String exata
            const codigoNum = parseInt(codigoFiltro, 10);
            if (!isNaN(codigoNum)) {
                 // Busca exata pelo número do código
                mongoFilter["Codigo"] = codigoNum; 
            }
        }
        
        // 5d. Processar Filtro de Status
        const statusFiltro = searchParams.get('status');
        if (statusFiltro && statusFiltro !== 'all') {
            // Busca exata no campo 'Status'
            mongoFilter["Status"] = statusFiltro;
        }

        // 5e. Processar Paginação
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '20', 10);
        
        const skip = (page - 1) * limit;

        console.log("filtro", mongoFilter);

        // 5. BUSCAR OS DADOS (PRODUTOS, PEDIDOS, etc.)
        const pedidos = await db.collection('DtoVenda')
                                .find(mongoFilter) // Aqui você adicionaria filtros da requisição (query params)
                                .sort({Codigo: -1} as Sort)
                                .skip(skip)
                                .limit(limit)
                                .toArray();

        // 6. RETORNAR OS DADOS AO CLIENTE
        return NextResponse.json(pedidos, { status: 200 });

    } catch (error) {
        console.error("Erro ao buscar pedidos no MongoDB:", error);
        return NextResponse.json({ message: "Erro interno ao buscar dados." }, { status: 500 });
    } finally {
        // 7. FECHAR A CONEXÃO COM O MONGODB
        if (mongoClient) {
            await mongoClient.close();
        }
    }
}