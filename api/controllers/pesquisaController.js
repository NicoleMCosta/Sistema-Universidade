import {
  buscarPesquisa,
  criarPesquisa,
  deletarPesquisa
} from "../models/pesquisaModel.js";
import { criarErro } from "../middlewares/erros.js";

export async function buscarPorId(req, res, next) {
  try {
    const { numMatriculaProf, numProjeto } = req.params;
    console.log(`Buscando pesquisa: Prof ${numMatriculaProf}, Proj ${numProjeto}`);
    
    const pesquisa = await buscarPesquisa(numMatriculaProf, numProjeto);
    
    if (!pesquisa) {
      console.warn('Pesquisa não encontrada');
      return res.status(404).json({ 
        success: false,
        erro: "Pesquisa não encontrada",
        details: {
          numMatriculaProf,
          numProjeto
        }
      });
    }
    
    res.status(200).json({
      success: true,
      data: pesquisa
    });
  } catch (error) {
    console.error('Erro no controller ao buscar pesquisa:', error);
    next(criarErro(500, {
      message: "Erro ao buscar pesquisa",
      technicalDetails: error.message
    }));
  }
}

export async function criar(req, res, next) {
  try {
    const { numMatriculaProf, numProjeto } = req.body;
    console.log('Criando nova pesquisa:', { numMatriculaProf, numProjeto });
    
    if (!numMatriculaProf || !numProjeto) {
      return res.status(400).json({
        success: false,
        erro: "Campos obrigatórios ausentes",
        required: ["numMatriculaProf", "numProjeto"]
      });
    }
    
    const nova = await criarPesquisa(numMatriculaProf, numProjeto);
    
    res.status(201).json({
      success: true,
      data: nova
    });
  } catch (error) {
    console.error('Erro no controller ao criar pesquisa:', error);
    next(criarErro(500, {
      message: "Erro ao criar pesquisa",
      technicalDetails: error.message
    }));
  }
}

export async function deletar(req, res, next) {
  try {
    const { numMatriculaProf, numProjeto } = req.params;
    console.log(`Deletando pesquisa: Prof ${numMatriculaProf}, Proj ${numProjeto}`);
    
    const deletada = await deletarPesquisa(numMatriculaProf, numProjeto);
    
    if (!deletada) {
      return res.status(404).json({
        success: false,
        erro: "Pesquisa não encontrada para deletar",
        details: {
          numMatriculaProf,
          numProjeto
        }
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Pesquisa deletada com sucesso"
    });
  } catch (error) {
    console.error('Erro no controller ao deletar pesquisa:', error);
    next(criarErro(500, {
      message: "Erro ao deletar pesquisa",
      technicalDetails: error.message
    }));
  }
}

export async function atualizar(req, res, next) {
  try {
    const { numMatriculaProf, numProjeto } = req.params;
    const { novoNumMatriculaProf, novoNumProjeto } = req.body;
    
    console.log(`Atualizando pesquisa: Prof ${numMatriculaProf}, Proj ${numProjeto}`);
    console.log('Novos valores:', { novoNumMatriculaProf, novoNumProjeto });
    
    // Primeiro deleta a relação antiga
    await deletarPesquisa(numMatriculaProf, numProjeto);
    
    // Depois cria a nova relação
    const novaPesquisa = await criarPesquisa(
      novoNumMatriculaProf || numMatriculaProf,
      novoNumProjeto || numProjeto
    );
    
    res.status(200).json({
      success: true,
      data: novaPesquisa
    });
  } catch (error) {
    console.error('Erro no controller ao atualizar pesquisa:', error);
    next(criarErro(500, {
      message: "Erro ao atualizar pesquisa",
      technicalDetails: error.message
    }));
  }
}