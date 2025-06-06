import {
  buscarPesquisa,
  criarPesquisa,
  deletarPesquisa
} from "../models/pesquisaModel.js";
import { criarErro } from "../middlewares/erros.js";

export async function buscarPorId(req, res, next) {
  try {
    const { numMatriculaProf, numProjeto } = req.params;
    const pesquisa = await buscarPesquisa(numMatriculaProf, numProjeto);
    if (!pesquisa) return res.status(404).json({ erro: "Pesquisa não encontrada" });
    res.status(200).json(pesquisa);
  } catch (error) {
    return next(criarErro(500, "Erro ao buscar pesquisa"));
  }
}

export async function criar(req, res, next) {
  try {
    const { numMatriculaProf, numProjeto } = req.body;
    if (!numMatriculaProf || !numProjeto) return res.status(400).json({ erro: "Campos obrigatórios ausentes" });
    const nova = await criarPesquisa(numMatriculaProf, numProjeto);
    res.status(201).json(nova);
  } catch (error) {
    return next(criarErro(500, "Erro ao criar pesquisa"));
  }
}

export async function deletar(req, res, next) {
  try {
    const { numMatriculaProf, numProjeto } = req.params;
    const deletada = await deletarPesquisa(numMatriculaProf, numProjeto);
    if (!deletada) return res.status(404).json({ erro: "Pesquisa não encontrada para deletar" });
    res.status(200).json({ mensagem: "Pesquisa deletada com sucesso" });
  } catch (error) {
    return next(criarErro(500, "Erro ao deletar pesquisa"));
  }
}
//atualização em entidades N:N deleta e cria denovo 
export async function atualizar(req, res, next) {
  try {
    const { numMatriculaProf, numProjeto } = req.params;
    await deletarPesquisa(numMatriculaProf, numProjeto);
    const novaPesquisa = await criarPesquisa(numMatriculaProf, numProjeto);
    res.status(200).json(novaPesquisa);
  } catch (error) {
    return next(criarErro(500, 'Erro ao atualizar pesquisa'));
  }
}