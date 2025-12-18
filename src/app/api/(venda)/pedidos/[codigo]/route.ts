import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { Filter, MongoClient, ObjectId, Sort } from "mongodb";
import { LoginRepo } from "@/repository/login";

const loginRepo = new LoginRepo();
const AUTH_COOKIE_NAME = 'auth_token';

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

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{codigo: string}> }
) {
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

           mongoFilter.Codigo = parseInt((await params).codigo);
   
           const vendaCollection = db.collection('DtoVenda');
           // 5. BUSCAR OS DADOS (PRODUTOS, PEDIDOS, etc.)
           const pedido = await vendaCollection
                .findOne(mongoFilter) // Aqui você adicionaria filtros da requisição (query params)
                                //    .sort({Codigo: -1} as Sort)
                                //    .skip(skip)
                                //    .limit(limit)
                                //    .toArray();
   
        //    const totalPedidos = await vendaCollection.countDocuments(mongoFilter)                               
        //    const totalPaginas = Math.ceil(totalPedidos / limit);
   
           const responseData = {
               venda: pedido,
            //    meta: {
            //        totalPedidos: totalPedidos,
            //        totalPaginas: totalPaginas,
            //    }
           }
   
           // 6. RETORNAR OS DADOS AO CLIENTE
           return NextResponse.json(responseData, { status: 200 });
    } catch (error) {
        console.error("Erro API /vendas/[codigo]:", error)
        return NextResponse.json(
            { error: "Erro interno" },
            { status: 500 }
        )
    }
}