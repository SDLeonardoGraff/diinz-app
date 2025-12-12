import Database, { Database as DBDerived } from "better-sqlite3";
import bcrypt from 'bcrypt';
import path from "path";

interface User {
    id: number;
    email: string;
    password_hash: string;
    created_at: string;
}

interface AuthenticatedUser {
    id: number;
    email: string;
}

const DB_PATH: string = path.resolve(process.cwd(), 'db_local_test.db');

export class LoginRepo {
    private db: DBDerived;

    constructor() {
        try {
            this.db = new Database(DB_PATH, {verbose: console.log});
            console.log(`Conectado ao banco de dados em: ${DB_PATH}`);
        } catch (error) {
            console.error("Erro ao conectar ao banco de dados:", (error as Error).message);
            process.exit(1);
        }
    }

    /**
     * Busca um usuário pelo e-mail e verifica se a senha é válida.
     * @param email O email fornecido pelo usuário.
     * @param password A senha fornecida pelo usuário (texto puro).
     * @returns O objeto do usuário autenticado (sem o hash da senha) ou null se as credenciais forem inválidas.
     */
    public async findUserByCredentials(
        email: string,
        password: string,
    ): Promise<AuthenticatedUser | null> {
        
        // 1. Prepara a consulta SQL para buscar o usuário pelo e-mail.
        const userQuery = this.db.prepare<[string]>(
            'SELECT * FROM users WHERE email = ?'
        );

        // 2. Executa a busca. O tipo do retorno é forçado para User ou undefined
        // (better-sqlite3.get() retorna undefined se não encontrar).
        const user = userQuery.get(email) as User | undefined;
        if (!user) {
            return null;
        }

        // 3. Compara a senha fornecida com o hash salvo no banco.
        // o bcrypt.compare é naturalmente assíncrono.
        const isPasswordValid: boolean = await bcrypt.compare(password, user.password_hash);

        if (isPasswordValid) {
            const { password_hash, ...userData } = user;
            return userData as AuthenticatedUser;
        } else {
            return null;
        }
    }

    public close(): void {
        this.db.close();
    }
}