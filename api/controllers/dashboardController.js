import { buscarTodosEstudantes } from "../models/estudanteModel.js";
import { buscarTodasParticipacoes } from "../models/participaModel.js";
import { buscarTodosDepartamentos } from "../models/departamentoModel.js";
import { buscarTodosProfessores } from "../models/professorModel.js";
import { buscarTodasPesquisas } from "../models/pesquisaModel.js";
import { buscarTodosProjetos } from "../models/projetoModel.js";
import { buscarTodosTrabalhos } from "../models/trabalhaModel.js";

import { criarErro } from "../middlewares/erros.js";

export async function carregarDashboard(req, res, next) {
  try {
    const results = await Promise.allSettled([
      buscarTodosEstudantes(),
      buscarTodasParticipacoes(),
      buscarTodosDepartamentos(),
      buscarTodosProfessores(),
      buscarTodasPesquisas(),
      buscarTodosProjetos(),
      buscarTodosTrabalhos()
    ]);

    // Extrai os valores ou substitui por array vazio em caso de erro
    const [
      estudantesRes,
      participacoesRes,
      departamentosRes,
      professoresRes,
      pesquisasRes,
      projetosRes,
      trabalhosRes
    ] = results;

    const estudantes = estudantesRes.status === "fulfilled" ? estudantesRes.value : [];
    const participacoes = participacoesRes.status === "fulfilled" ? participacoesRes.value : [];
    const departamentos = departamentosRes.status === "fulfilled" ? departamentosRes.value : [];
    const professores = professoresRes.status === "fulfilled" ? professoresRes.value : [];
    const pesquisas = pesquisasRes.status === "fulfilled" ? pesquisasRes.value : [];
    const projetos = projetosRes.status === "fulfilled" ? projetosRes.value : [];
    const trabalhos = trabalhosRes.status === "fulfilled" ? trabalhosRes.value : [];

    res.status(200).json({
      estudantes,
      participacoes,
      departamentos,
      professores,
      pesquisas,
      projetos,
      trabalhos
    });

  } catch (erro) {
    return next(criarErro(500, "Erro inesperado ao carregar o dashboard"));
  }
}
