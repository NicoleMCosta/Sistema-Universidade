import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToMongo } from './db/index.js';

import estudantesRoutes from "./routes/estudantesRoutes.js";
import professoresRoutes from "./routes/professoresRoutes.js";
import departamentosRoutes from "./routes/departamentosRoutes.js";
import projetosRoutes from "./routes/projetosRoutes.js";
import pesquisaRoutes from "./routes/pesquisaRoutes.js";
import participaRoutes from "./routes/participaRoutes.js";
import trabalhaRoutes from "./routes/trabalhaRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));
app.use(express.json());

await connectToMongo();

app.use('/api/estudantes', estudantesRoutes);
app.use('/api/professores', professoresRoutes);
app.use('/api/departamentos', departamentosRoutes);
app.use('/api/projetos', projetosRoutes);
app.use('/api/pesquisa', pesquisaRoutes);
app.use('/api/participa', participaRoutes);
app.use('/api/trabalha', trabalhaRoutes);
app.use('/api/dashboard', dashboardRoutes);


app.use(function (req, res) {
  res.status(404).json({ error: 'Not found' });
});


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  return res.status(statusCode).json({ error: message });
});


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
