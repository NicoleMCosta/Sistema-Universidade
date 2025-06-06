import {
  criarProjeto,
  buscarProjetoPorId,
  atualizarProjeto,
  deletarProjeto,
} from "../models/projetoModel.js";
import { criarErro } from "../middlewares/erros.js";

export async function criar(req, res, next) {
  try {
    const { numProjeto, orgao_financiador, data_inicio, data_final, orcamento, pesquisador_principal } = req.body;
    const resultado = await criarProjeto(numProjeto, orgao_financiador, data_inicio, data_final, orcamento, pesquisador_principal);
    res.status(201).json(resultado);
  } catch (erro) {
    next(criarErro(500, "Erro ao criar projeto"));
  }
}

export async function buscarPorId(req, res, next) {
  try {
    const { numProjeto } = req.params;
    const resultado = await buscarProjetoPorId(numProjeto);
    if (!resultado) return res.status(404).json({ erro: "Projeto não encontrado" });
    res.status(200).json(resultado);
  } catch (erro) {
    next(criarErro(500, "Erro ao buscar projeto"));
  }
}

export async function atualizar(req, res, next) {
  try {
    const { numProjeto } = req.params;
    const { orgao_financiador, data_inicio, data_final, orcamento, pesquisador_principal } = req.body;
    const resultado = await atualizarProjeto(numProjeto, orgao_financiador, data_inicio, data_final, orcamento, pesquisador_principal);
    if (!resultado) return res.status(404).json({ erro: "Projeto não encontrado" });
    res.status(200).json(resultado);
  } catch (erro) {
    next(criarErro(500, "Erro ao atualizar projeto"));
  }
}

export async function deletar(req, res, next) {
  try {
    const { numProjeto } = req.params;
    const resultado = await deletarProjeto(numProjeto);
    if (!resultado) return res.status(404).json({ erro: "Projeto não encontrado" });
    res.status(200).json({ message: "Projeto deletado com sucesso" });
  } catch (erro) {
    next(criarErro(500, "Erro ao deletar projeto"));
  }
}
