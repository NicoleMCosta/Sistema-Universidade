import {
  criarProfessor,
  buscarProfessorPorMatricula,
  atualizarProfessor,
  deletarProfessor,
} from "../models/professorModel.js";
import { criarErro } from "../middlewares/erros.js";

export async function criar(req, res, next) {
  try {
    const { numMatriculaProf, nome, idade, sala, especialidade_pesquisa, tempo } = req.body;
    const resultado = await criarProfessor(numMatriculaProf, nome, idade, sala, especialidade_pesquisa, tempo);
    res.status(201).json(resultado);
  } catch (erro) {
    next(criarErro(500, "Erro ao criar professor"));
  }
}

export async function buscarPorId(req, res, next) {
  try {
    const { numMatriculaProf } = req.params;
    const resultado = await buscarProfessorPorMatricula(numMatriculaProf);
    if (!resultado) return res.status(404).json({ erro: "Professor não encontrado" });
    res.status(200).json(resultado);
  } catch (erro) {
    next(criarErro(500, "Erro ao buscar professor"));
  }
}

export async function atualizar(req, res, next) {
  try {
    const { numMatriculaProf } = req.params;
    const { nome, idade, sala, especialidade_pesquisa, tempo } = req.body;
    const resultado = await atualizarProfessor(numMatriculaProf, nome, idade, sala, especialidade_pesquisa, tempo);
    if (!resultado) return res.status(404).json({ erro: "Professor não encontrado" });
    res.status(200).json(resultado);
  } catch (erro) {
    next(criarErro(500, "Erro ao atualizar professor"));
  }
}

export async function deletar(req, res, next) {
  try {
    const { numMatriculaProf } = req.params;
    const resultado = await deletarProfessor(numMatriculaProf);
    if (!resultado) return res.status(404).json({ erro: "Professor não encontrado" });
    res.status(200).json({ message: "Professor deletado com sucesso" });
  } catch (erro) {
    next(criarErro(500, "Erro ao deletar professor"));
  }
}