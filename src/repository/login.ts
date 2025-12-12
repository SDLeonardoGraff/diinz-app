// import Database, { Database as DBDerived } from "better-sqlite3";
// import bcrypt from 'bcrypt';
// import path from "path";

// interface User {
//     id: number;
//     email: string;
//     password_hash: string;
//     created_at: string;
// }

// interface AuthenticatedUser {
//     id: number;
//     email: string;
// }

// const DB_PATH: string = path.resolve(process.cwd(), 'db_local_test.db');

// export class LoginRepo {
//     private db: DBDerived;

//     constructor() {
//         try {
//             this.db = new Database(DB_PATH, {verbose: console.log});
//             console.log(`Conectado ao banco de dados em: ${DB_PATH}`);
//         } catch (error) {
//             console.error("Erro ao conectar ao banco de dados:", (error as Error).message);
//             process.exit(1);
//         }
//     }

//     /**
//      * Busca um usuário pelo e-mail e verifica se a senha é válida.
//      * @param email O email fornecido pelo usuário.
//      * @param password A senha fornecida pelo usuário (texto puro).
//      * @returns O objeto do usuário autenticado (sem o hash da senha) ou null se as credenciais forem inválidas.
//      */
//     public async findUserByCredentials(
//         email: string,
//         password: string,
//     ): Promise<AuthenticatedUser | null> {
        
//         // 1. Prepara a consulta SQL para buscar o usuário pelo e-mail.
//         const userQuery = this.db.prepare<[string]>(
//             'SELECT * FROM users WHERE email = ?'
//         );

//         // 2. Executa a busca. O tipo do retorno é forçado para User ou undefined
//         // (better-sqlite3.get() retorna undefined se não encontrar).
//         const user = userQuery.get(email) as User | undefined;
//         if (!user) {
//             return null;
//         }

//         // 3. Compara a senha fornecida com o hash salvo no banco.
//         // o bcrypt.compare é naturalmente assíncrono.
//         const isPasswordValid: boolean = await bcrypt.compare(password, user.password_hash);

//         if (isPasswordValid) {
//             const { password_hash, ...userData } = user;
//             return userData as AuthenticatedUser;
//         } else {
//             return null;
//         }
//     }

//     public close(): void {
//         this.db.close();
//     }
// }

import Database, { Database as DBDerived } from "better-sqlite3";
import bcrypt from 'bcrypt';
import path from "path";

// 🛑 NOVA INTERFACE: Para os dados de conexão do MongoDB
interface MongoConnectionData {
    id: number;
    user_id: number;
    name: string;
    uri: string;
    database: string;
    username?: string; // Tornando opcional, se o URI já tiver tudo
    password?: string; // Tornando opcional, se o URI já tiver tudo
}

// 🛑 INTERFACE EXISTENTE
interface User {
    id: number;
    email: string;
    password_hash: string;
    created_at: string;
}

// 🛑 INTERFACE EXISTENTE
interface AuthenticatedUser {
    id: number;
    email: string;
}

const DB_PATH: string = path.resolve(process.cwd(), 'db_local_test.db');

export class LoginRepo {
    private db: DBDerived;

    constructor() {
        try {
            // Habilita a Foreign Key ao iniciar a conexão (melhor prática)
            const dbInstance = new Database(DB_PATH, {verbose: console.log});
            dbInstance.exec('PRAGMA foreign_keys = ON;');
            this.db = dbInstance;
            
            console.log(`Conectado ao banco de dados em: ${DB_PATH}`);
        } catch (error) {
            console.error("Erro ao conectar ao banco de dados:", (error as Error).message);
            process.exit(1);
        }
    }

    /**
     * Busca um usuário pelo e-mail e verifica se a senha é válida.
     * [Método findUserByCredentials omitido por brevidade]
     */
    public async findUserByCredentials(
        email: string,
        password: string,
    ): Promise<AuthenticatedUser | null> {
        
        const userQuery = this.db.prepare<[string]>(
            'SELECT * FROM users WHERE email = ?'
        );

        const user = userQuery.get(email) as User | undefined;
        if (!user) {
            return null;
        }

        const isPasswordValid: boolean = await bcrypt.compare(password, user.password_hash);

        if (isPasswordValid) {
            const { password_hash, ...userData } = user;
            return userData as AuthenticatedUser;
        } else {
            return null;
        }
    }

    /**
     * 🛑 NOVO MÉTODO: Busca os dados de conexão do MongoDB vinculados a um user_id.
     * Assume-se que o usuário autenticado deve ter uma conexão principal.
     * @param userId O ID do usuário autenticado (tabela 'users').
     * @returns Os dados de conexão do MongoDB ou null se não forem encontrados.
     */
    public getMongoConnectionData(userId: number): MongoConnectionData | null {
        try {
            // 1. Prepara a consulta SQL.
            // Selecionamos todas as colunas da tabela mongo_connections onde o user_id corresponde.
            // Se houver múltiplas conexões por usuário, você pode adicionar 'AND name = ?'
            // para buscar uma específica. Aqui, buscamos a primeira (GET) encontrada.
            const connectionQuery = this.db.prepare<[number]>(
                `
                SELECT id, user_id, name, uri, database, username, password 
                FROM mongo_connections 
                WHERE user_id = ?
                `
            );

            // 2. Executa a busca.
            const data = connectionQuery.get(userId) as MongoConnectionData | undefined;

            if (data) {
                console.log(`Dados de conexão MongoDB encontrados para o usuário ID ${userId}.`);
                return data;
            } else {
                console.warn(`Nenhum dado de conexão MongoDB encontrado para o usuário ID ${userId}.`);
                return null;
            }
        } catch (error) {
            console.error("Erro ao buscar dados de conexão MongoDB:", (error as Error).message);
            return null;
        }
    }

    public close(): void {
        this.db.close();
    }
}