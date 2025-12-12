import { LoginRepo } from "@/repository/login";
import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";

const loginRepo = new LoginRepo();
const AUTH_COOKIE_NAME = 'auth_token';

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

            const sessionToken = `session_${Date.now()}`;
            const cookie = serialize(AUTH_COOKIE_NAME, sessionToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                // maxAge: 60 * 60 * 24 * 7, // 1 semana
                // maxAge: 60 * 60 * 2, // 2 horas
                maxAge: rememberMe ? 60 * 60 * 8 : 60 * 60 * 3,
                // maxAge: 60 * 5, // 1 semana
                path: '/',
                sameSite: 'strict',
            });

            const response = new NextResponse(
                JSON.stringify({
                    message: "Login bem-sucedido.",
                    user: user
                }),
                {status: 200}
            );
            response.headers.set("Set-Cookie", cookie);
            return response;
        } else {
            // ❌ Falha no Login (E-mail encontrado, mas senha incorreta OU E-mail não encontrado)
            // É uma boa prática de segurança retornar sempre uma mensagem genérica
            return NextResponse.json(
                { message: "Credenciais inválidas. Verifique seu e-mail ou senha." }, 
                { status: 401 } // Unauthorized
            );
        }
    } catch (error) {
        // Captura erros de parsing JSON ou outros erros inesperados do servidor
        console.error("Erro no processamento da requisição de login:", error);

        return NextResponse.json(
            { message: "Erro interno do servidor." }, 
            { status: 500 } // Internal Server Error
        );
    }
}