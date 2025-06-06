import {
  buscarTrabalho,
  criarTrabalho,
  deletarTrabalho
} from "../models/trabalhaModel.js";
import { criarErro } from "../middlewares/erros.js";

export async function buscarPorId(req, res, next) {
  try {
    const { liderDept, numDept, numMatriculaProf } = req.params;
    const trabalho = await buscarTrabalho(liderDept, numDept, numMatriculaProf);
    if (!trabalho) return res.status(404).json({ erro: "Trabalho não encontrado" });
    res.status(200).json(trabalho);
  } catch (error) {
    return next(criarErro(500, "Erro ao buscar trabalho"));
  }
}

export async function criar(req, res, next) {
  try {
    const { liderDept, numDept, numMatriculaProf } = req.body;
    if (!liderDept || !numDept || !numMatriculaProf) return res.status(400).json({ erro: "Campos obrigatórios ausentes" });
    const novo = await criarTrabalho(liderDept, numDept, numMatriculaProf);
    res.status(201).json(novo);
  } catch (error) {
    return next(criarErro(500, "Erro ao criar trabalho"));
  }
}

export async function deletar(req, res, next) {
  try {
    const { liderDept, numDept, numMatriculaProf } = req.params;
    const deletado = await deletarTrabalho(liderDept, numDept, numMatriculaProf);
    if (!deletado) return res.status(404).json({ erro: "Trabalho não encontrado para deletar" });
    res.status(200).json({ mensagem: "Trabalho deletado com sucesso" });
  } catch (error) {
    return next(criarErro(500, "Erro ao deletar trabalho"));
  }
}
//atualização em entidades N:N deleta e cria denovo 
export async function atualizar(req, res, next) {
  try {
    const { liderDept, numDept, numMatriculaProf } = req.params;
    await deletarTrabalho(liderDept, numDept, numMatriculaProf);
    const novoTrabalho = await criarTrabalho(liderDept, numDept, numMatriculaProf);
    res.status(200).json(novoTrabalho);
  } catch (error) {
    return next(criarErro(500, 'Erro ao atualizar trabalho'));
  }
}