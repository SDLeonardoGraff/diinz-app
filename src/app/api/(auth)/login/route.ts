import { LoginRepo } from "@/repository/login";
import { NextRequest, NextResponse } from "next/server";

const loginRepo = new LoginRepo();

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
            console.log(`Login bem-sucedido para o usuário ID: ${user.id}`);

            return NextResponse.json(
                {
                    message: "Login bem-sucedido.",
                    user: user
                },
                {status: 200}
            )
        } else {
            // ❌ Falha no Login (E-mail encontrado, mas senha incorreta OU E-mail não encontrado)
            // É uma boa prática de segurança retornar sempre uma mensagem genérica
            return NextResponse.json(
                { message: "Credenciais inválidas. Verifique seu e-mail ou senha." }, 
                { status: 401 } // Unauthorized
            );
        }
    } catch (error) {
        loginRepo.close();
        // Captura erros de parsing JSON ou outros erros inesperados do servidor
        console.error("Erro no processamento da requisição de login:", error);

        return NextResponse.json(
            { message: "Erro interno do servidor." }, 
            { status: 500 } // Internal Server Error
        );
    }
}