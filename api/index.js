import express from "express";
import {config} from "dotenv";
import RotasPrestadores from "./routes/prestador.js"
config(); // carrega as variaveis do .env

const app = express();
const {PORT} = process.env;

app.use(express.json());
// rota de conteúdo público
app.use('/', express.static('public'));

// removendo o x-powered-by por segurança
app.disable('x-powered-by');
// configurando fivicon
app.use('/favicon.ico', express.static('public/images/logo-api.png'));

// rota default
app.get('/api', (req, res) => {
    res.status(200).json({
        message: "API FATEC 100% FUNCIONAL✔",
        version: '1.0.0'
    });
});

// rotas da API
app.use('/api/prestadores', RotasPrestadores)

// Listen
app.listen(PORT, () => {
    console.log(`💻 Servidor rodando na porta http://localhost:${PORT}`)
});


