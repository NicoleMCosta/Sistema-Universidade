import {
  buscarTrabalho,
  criarTrabalho,
  deletarTrabalho
} from "../models/trabalhaModel.js";
import { criarErro } from "../middlewares/erros.js";

export async function buscarPorId(req, res, next) {
  try {
    const { liderDept, numDept, numMatriculaProf } = req.params;
    console.log(`Buscando trabalho: Líder ${liderDept}, Dept ${numDept}, Prof ${numMatriculaProf}`);
    
    const trabalho = await buscarTrabalho(liderDept, numDept, numMatriculaProf);
    
    if (!trabalho) {
      console.warn('Trabalho não encontrado');
      return res.status(404).json({ 
        success: false,
        erro: "Trabalho não encontrado",
        details: {
          liderDept,
          numDept,
          numMatriculaProf
        }
      });
    }
    
    res.status(200).json({
      success: true,
      data: trabalho
    });
  } catch (error) {
    console.error('Erro no controller ao buscar trabalho:', error);
    next(criarErro(500, {
      message: "Erro ao buscar trabalho",
      technicalDetails: error.message
    }));
  }
}

export async function criar(req, res, next) {
  try {
    const { liderDept, numDept, numMatriculaProf } = req.body;
    console.log('Criando novo trabalho:', { liderDept, numDept, numMatriculaProf });
    
    if (!liderDept || !numDept || !numMatriculaProf) {
      return res.status(400).json({
        success: false,
        erro: "Campos obrigatórios ausentes",
        required: ["liderDept", "numDept", "numMatriculaProf"]
      });
    }
    
    const novo = await criarTrabalho(liderDept, numDept, numMatriculaProf);
    
    res.status(201).json({
      success: true,
      data: novo
    });
  } catch (error) {
    console.error('Erro no controller ao criar trabalho:', error);
    next(criarErro(500, {
      message: "Erro ao criar trabalho",
      technicalDetails: error.message
    }));
  }
}

export async function deletar(req, res, next) {
  try {
    const { liderDept, numDept, numMatriculaProf } = req.params;
    console.log(`Deletando trabalho: Líder ${liderDept}, Dept ${numDept}, Prof ${numMatriculaProf}`);
    
    const deletado = await deletarTrabalho(liderDept, numDept, numMatriculaProf);
    
    if (!deletado) {
      return res.status(404).json({
        success: false,
        erro: "Trabalho não encontrado para deletar",
        details: {
          liderDept,
          numDept,
          numMatriculaProf
        }
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Trabalho deletado com sucesso"
    });
  } catch (error) {
    console.error('Erro no controller ao deletar trabalho:', error);
    next(criarErro(500, {
      message: "Erro ao deletar trabalho",
      technicalDetails: error.message
    }));
  }
}

export async function atualizar(req, res, next) {
  try {
    const { liderDept, numDept, numMatriculaProf } = req.params;
    const { novoLiderDept, novoNumDept, novoNumMatriculaProf } = req.body;
    
    console.log(`Atualizando trabalho: Líder ${liderDept}, Dept ${numDept}, Prof ${numMatriculaProf}`);
    console.log('Novos valores:', { novoLiderDept, novoNumDept, novoNumMatriculaProf });
    
    // Primeiro deleta a relação antiga
    await deletarTrabalho(liderDept, numDept, numMatriculaProf);
    
    // Depois cria a nova relação
    const novoTrabalho = await criarTrabalho(
      novoLiderDept || liderDept,
      novoNumDept || numDept,
      novoNumMatriculaProf || numMatriculaProf
    );
    
    res.status(200).json({
      success: true,
      data: novoTrabalho
    });
  } catch (error) {
    console.error('Erro no controller ao atualizar trabalho:', error);
    next(criarErro(500, {
      message: "Erro ao atualizar trabalho",
      technicalDetails: error.message
    }));
  }
}