import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import alunoRoutes from "./routes/alunoRoutes.js"

dotenv.config()

const app = express()
const PORT = 3000;

const corsOptions = {
    origin: "*"
}

app.use(cors(corsOptions));
app.use(express.json())

app.use('/api/alunos', alunoRoutes);

app.use(function (req, res) {
    res.status(404).json({error: 'Not found'})
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    return res.status(statusCode).json({ error:message });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})