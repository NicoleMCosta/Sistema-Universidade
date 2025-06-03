import {
  buscarTodosEstudantes,
  criarEstudante,
  buscarEstudantePorMat,
  atualizarEstudante,
  deletarEstudante
} from '../models/alunoModel.js';
import { criarErro } from "../middlewares/erros.js";

export async function buscar(req, res, next) {
  try {
    const estudantes = await buscarTodosEstudantes();
    res.status(200).json(estudantes);
  } catch (erro) {
    return next(criarErro(500, "Erro ao listar alunos"));
  }
}

export async function criar(req, res, next) {
    try {
        const { numMatriculaEstd, nome, idade, tipo_curso, numDept, numMatricula_aconselhador } = req.body;

        if (!numMatriculaEstd || !nome || !idade || !tipo_curso || !numDept || !numMatricula_aconselhador) {
            return res.status(400).json({ erro: 'Todos os campos são necessários'})
        }

        const novoEstudante = await criarEstudante(numMatriculaEstd, nome, idade, tipo_curso, numDept, numMatricula_aconselhador);
        res.status(200).json(novoEstudante);
    } catch (error) {
        return next(criarErro(500, 'Erro ao criar Aluno'))
    }
}

export async function buscarPorMat(req, res, next) {
    try {
        const { numMatriculaEstd } = req.params;

        if (!numMatriculaEstd) return res.status(400).json({ erro: 'Número de matrícula não fornecido' });

        const estudante = await buscarEstudantePorMat(numMatriculaEstd);

        if (!estudante) return res.status(404).json({ erro: 'Estudante não encontrado' });

        res.status(200).json(estudante);
    } catch (error) {
        return next(criarErro(500, 'Erro ao buscar Aluno'));
    }
}

export async function atualizar(req, res, next) {
  try {
    const { numMatriculaEstd } = req.params;
    const { nome, idade, tipo_curso, numDept, numMatricula_aconselhador } = req.body;

    if (!numMatriculaEstd) return res.status(400).json({ erro: 'Número de matrícula não fornecido' });

    const estudanteAtualizado = await atualizarEstudante(numMatriculaEstd, nome, idade, tipo_curso, numDept, numMatricula_aconselhador);

    if (!estudanteAtualizado) return res.status(404).json({ erro: "Estudante não encontrado para atualizar" });

    res.status(200).json(estudanteAtualizado);
  } catch (error) {
    return next(criarErro(500, 'Erro ao atualizar Aluno'));
  }
}

export async function deletar(req, res, next) {
  try {
    const { numMatriculaEstd } = req.params;

    if (!numMatriculaEstd) return res.status(400).json({ erro: 'Número de matrícula não fornecido' });

    const estudanteDeletado = await deletarEstudante(numMatriculaEstd);

    if (!estudanteDeletado) return res.status(404).json({ erro: 'Estudante não encontrado para deletar' });

    res.status(200).json({ message: 'Aluno deletado com sucesso' });
  } catch (error) {
    return next(criarErro(500, 'Erro ao deletar Aluno'));
  }
}
