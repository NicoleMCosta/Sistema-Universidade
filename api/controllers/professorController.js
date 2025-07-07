import {
  criarProfessor,
  buscarProfessorPorMatricula,
  atualizarProfessor,
  deletarProfessor,
} from "../models/professorModel.js";
import { criarErro } from "../middlewares/erros.js";

export async function criar(req, res, next) {
  try {
    const { numMatriculaProf, nome, idade, sala, especialidade_pesquisa, tempo, numDept } = req.body;
    const resultado = await criarProfessor(numMatriculaProf, nome, idade, sala, especialidade_pesquisa, tempo, numDept);
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
    const { nome, idade, sala, especialidade_pesquisa, tempo, numDept } = req.body;

    console.log('Iniciando atualização para matrícula:', numMatriculaProf);
    
    const resultado = await atualizarProfessor(
      numMatriculaProf,
      nome,
      idade,
      sala,
      especialidade_pesquisa,
      tempo
    );

    console.log('Resultado retornado pelo model:', typeof resultado, resultado);

    // Verificação corrigida
    if (resultado === null) {
      console.warn('Professor não encontrado para atualização');
      return res.status(404).json({ 
        success: false,
        erro: "Professor não encontrado",
        technicalDetails: {
          receivedMatricula: numMatriculaProf,
          collection: 'professores',
          operation: 'update'
        }
      });
    }

    console.log('Atualização concluída com sucesso');
    return res.status(200).json({
      success: true,
      data: resultado
    });
    
  } catch (erro) {
    console.error('Erro no controller ao atualizar professor:', erro);
    return next(criarErro(500, {
      message: "Erro ao atualizar professor",
      technicalDetails: erro.message
    }));
  }
}

export async function deletar(req, res, next) {
  try {
    const numMatriculaProf = parseInt(req.params.numMatriculaProf);
    const resultado = await deletarProfessor(numMatriculaProf);
    
    if (!resultado) {
      return res.status(404).json({ erro: "Professor não encontrado" });
    }

    res.status(200).json(resultado);
  } catch (erro) {
    next(criarErro(500, "Erro ao deletar professor"));
  }
}