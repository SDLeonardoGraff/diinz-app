const bcrypt = require('bcrypt');

const senha = "#admin531!";

const saltRounds = 10;

async function gerarHash() {
    try {
        const passwordHash = await bcrypt.hash(senha, saltRounds);
        
        console.log("Senha Pura:", senha);
        console.log("Hash Gerado (para salvar no BD):", passwordHash);
        
    } catch (err) {
        console.error("Erro ao gerar hash:", err);
    }
}

gerarHash();