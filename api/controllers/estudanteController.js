import {
  criarEstudante,
  buscarEstudantePorMat,
  atualizarEstudante,
  deletarEstudante
} from '../models/estudanteModel.js';
import { criarErro } from "../middlewares/erros.js";

export async function criar(req, res, next) {
    try {
        const { numMatriculaEstd, nome, idade, tipo_curso, numDept, numMatricula_aconselhador, numMatriculaProf, numProjeto } = req.body;

        if (!numMatriculaEstd || !nome || !idade || !tipo_curso || !numDept || !numMatricula_aconselhador || !numMatriculaProf || !numProjeto) {
            return res.status(400).json({ erro: 'Todos os campos são necessários. Se não houver projeto, preencha os campos Supervisor e Projeto com -1'})
        }

        const novoEstudante = await criarEstudante(numMatriculaEstd, nome, idade, tipo_curso, numDept, numMatricula_aconselhador, numMatriculaProf, numProjeto);
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
    const { nome, idade, tipo_curso, numDept, numMatricula_aconselhador, numMatriculaProf, numProjeto} = req.body;

    console.log('Iniciando atualização para matrícula:', numMatriculaEstd);
    console.log('Tipo da matrícula no controller:', typeof numMatriculaEstd);

    const resultado = await atualizarEstudante(
      numMatriculaEstd,
      nome,
      idade,
      tipo_curso,
      numDept,
      numMatricula_aconselhador,
      numMatriculaProf,
      numProjeto
    );

    if (!resultado) {
      console.warn('Estudante não encontrado para atualização');
      return res.status(404).json({
        success: false,
        erro: "Estudante não encontrado",
        details: {
          matriculaProcurada: numMatriculaEstd,
          tipoMatricula: typeof numMatriculaEstd
        }
      });
    }

    return res.status(200).json({
      success: true,
      data: resultado
    });
  } catch (error) {
    console.error('Erro no controller ao atualizar estudante:', error);
    return next(criarErro(500, {
      message: "Erro ao atualizar aluno",
      technicalDetails: error.message
    }));
  }
}

export async function deletar(req, res, next) {
  try {
    const { numMatriculaEstd } = req.params;
    const resultado = await deletarEstudante(numMatriculaEstd);
    
    if (!resultado) {
      return res.status(404).json({ erro: "Estudante não encontrado" });
    }

    res.status(200).json({ success: true, message: 'Aluno deletado com sucesso' });
  } catch (error) {
    next(criarErro(500, 'Erro ao deletar Aluno'));
  }
}