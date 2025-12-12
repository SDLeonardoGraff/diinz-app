// import { LoginRepo } from "@/repository/login";
// import { NextRequest, NextResponse } from "next/server";
// import { serialize } from "cookie";

// const loginRepo = new LoginRepo();
// const AUTH_COOKIE_NAME = 'auth_token';

// export async function POST(request: NextRequest) {
//     try {
//         const { email, password, rememberMe } = await request.json();

//         if (!email || !password) {
//             return NextResponse.json(
//                 {message: "E-mail e senha são obrigatórios."},
//                 {status: 400}
//             );
//         }

//         console.log(`Tentativa de login para: ${email}`);

//         const user = await loginRepo.findUserByCredentials(email, password);

//         if (user) {
//             console.log(`Login bem-sucedido.`);

//             loginRepo.getMongoConnectionData(user.id);

//             const sessionToken = `session_${Date.now()}`;
//             const cookie = serialize(AUTH_COOKIE_NAME, sessionToken, {
//                 httpOnly: true,
//                 secure: process.env.NODE_ENV === 'production',
//                 // maxAge: 60 * 60 * 24 * 7, // 1 semana
//                 // maxAge: 60 * 60 * 2, // 2 horas
//                 maxAge: rememberMe ? 60 * 60 * 8 : 60 * 60 * 3,
//                 // maxAge: 60 * 5, // 1 semana
//                 path: '/',
//                 sameSite: 'strict',
//             });

//             const response = new NextResponse(
//                 JSON.stringify({
//                     message: "Login bem-sucedido.",
//                     user: user
//                 }),
//                 {status: 200}
//             );
//             response.headers.set("Set-Cookie", cookie);
//             return response;
//         } else {
//             // ❌ Falha no Login (E-mail encontrado, mas senha incorreta OU E-mail não encontrado)
//             // É uma boa prática de segurança retornar sempre uma mensagem genérica
//             return NextResponse.json(
//                 { message: "Credenciais inválidas. Verifique seu e-mail ou senha." }, 
//                 { status: 401 } // Unauthorized
//             );
//         }
//     } catch (error) {
//         // Captura erros de parsing JSON ou outros erros inesperados do servidor
//         console.error("Erro no processamento da requisição de login:", error);

//         return NextResponse.json(
//             { message: "Erro interno do servidor." }, 
//             { status: 500 } // Internal Server Error
//         );
//     }
// }

import { LoginRepo } from "@/repository/login";
import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";
// 🛑 IMPORTAR UMA BIBLIOTECA DE SESSÃO OU JWT AQUI! (Ex: 'jsonwebtoken', 'iron-session')

const loginRepo = new LoginRepo();
const AUTH_COOKIE_NAME = 'auth_token';

// Função placeholder para gerar um token seguro com dados do payload
// EM UMA APLICAÇÃO REAL, ISSO USARIA CRYPTO/JWT/IRON-SESSION
function createSecureSessionToken(payload: object): string {
    // Aqui você criptografaria { userId: user.id, connectionId: mongoData.id }
    // Por enquanto, apenas um token simples para a demonstração
    const payloadString = JSON.stringify(payload);
    return Buffer.from(payloadString).toString('base64');
}


export async function POST(request: NextRequest) {
    try {
        const { email, password, rememberMe } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                {message: "E-mail e senha são obrigatórios."},
                {status: 400}
            );
        }

        console.log(`Tentativa de login para: ${email}`);

        const user = await loginRepo.findUserByCredentials(email, password);

        if (user) {
            console.log(`Login bem-sucedido.`);

            // 1. 🛑 BUSCA OS DADOS DE CONEXÃO DO MONGO
            const mongoData = loginRepo.getMongoConnectionData(user.id);

            if (!mongoData) {
                console.error(`Falha: Conexão MongoDB não configurada para o usuário ID ${user.id}`);
                return NextResponse.json(
                    { message: "Configuração de dados externa ausente." }, 
                    { status: 500 }
                );
            }
            
            // 2. 🛑 CRIA O PAYLOAD DA SESSÃO, INCLUINDO O ID DA CONEXÃO
            const sessionPayload = {
                userId: user.id,
                userEmail: user.email,
                // Salvamos APENAS o ID da conexão ou a URI criptografada no token
                mongoConnectionId: mongoData.id, 
                // OU: mongoUri: mongoData.uri (Se a URI for pequena e você a criptografar fortemente)
            };

            // 3. 🛑 GERA O TOKEN SEGURO (Substituir pela sua função de JWT real)
            const sessionToken = createSecureSessionToken(sessionPayload); 
            
            const maxAge = rememberMe ? 60 * 60 * 8 : 60 * 60 * 3; // 8 horas ou 3 horas
            
            const cookie = serialize(AUTH_COOKIE_NAME, sessionToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: maxAge,
                path: '/',
                sameSite: 'strict',
            });

            // 4. Retorna a resposta ao cliente
            const response = new NextResponse(
                JSON.stringify({
                    message: "Login bem-sucedido.",
                    // 🛑 Retornamos apenas dados não sensíveis do usuário
                    user: { id: user.id, email: user.email } 
                }),
                {status: 200}
            );
            response.headers.set("Set-Cookie", cookie);
            return response;
        } else {
            return NextResponse.json(
                { message: "Credenciais inválidas. Verifique seu e-mail ou senha." }, 
                { status: 401 }
            );
        }
    } catch (error) {
        console.error("Erro no processamento da requisição de login:", error);
        return NextResponse.json(
            { message: "Erro interno do servidor." }, 
            { status: 500 }
        );
    } finally {
        // Embora não seja estritamente necessário em API Routes (que são curtas),
        // fechar a conexão é uma boa prática se a conexão não for singleton.
        // loginRepo.close(); // Depende de como a instância de LoginRepo é gerenciada
    }
}