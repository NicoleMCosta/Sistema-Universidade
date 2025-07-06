import {
  buscarParticipacao,
  criarParticipacao,
  deletarParticipacao
} from "../models/participaModel.js";
import { criarErro } from "../middlewares/erros.js";

export async function buscarPorId(req, res, next) {
  try {
    const { numProjeto, assistente_investigacao, supervisor } = req.params;
    console.log(`Buscando participação: Projeto ${numProjeto}, Assistente ${assistente_investigacao}, Supervisor ${supervisor}`);
    
    const part = await buscarParticipacao(numProjeto, assistente_investigacao, supervisor);
    
    if (!part) {
      console.warn('Participação não encontrada');
      return res.status(404).json({ 
        success: false,
        erro: "Participação não encontrada",
        details: {
          numProjeto,
          assistente_investigacao,
          supervisor
        }
      });
    }
    
    res.status(200).json({
      success: true,
      data: part
    });
  } catch (error) {
    console.error('Erro no controller ao buscar participação:', error);
    next(criarErro(500, {
      message: "Erro ao buscar participação",
      technicalDetails: error.message
    }));
  }
}

export async function criar(req, res, next) {
  try {
    const { numProjeto, assistente_investigacao, supervisor } = req.body;
    console.log('Criando nova participação:', { numProjeto, assistente_investigacao, supervisor });
    
    if (!numProjeto || !assistente_investigacao || !supervisor) {
      return res.status(400).json({
        success: false,
        erro: "Campos obrigatórios ausentes",
        required: ["numProjeto", "assistente_investigacao", "supervisor"]
      });
    }
    
    const nova = await criarParticipacao(numProjeto, assistente_investigacao, supervisor);
    
    res.status(201).json({
      success: true,
      data: nova
    });
  } catch (error) {
    console.error('Erro no controller ao criar participação:', error);
    next(criarErro(500, {
      message: "Erro ao criar participação",
      technicalDetails: error.message
    }));
  }
}

export async function deletar(req, res, next) {
  try {
    const { numProjeto, assistente_investigacao, supervisor } = req.params;
    console.log(`Deletando participação: Projeto ${numProjeto}, Assistente ${assistente_investigacao}, Supervisor ${supervisor}`);
    
    const deletada = await deletarParticipacao(numProjeto, assistente_investigacao, supervisor);
    
    if (!deletada) {
      return res.status(404).json({
        success: false,
        erro: "Participação não encontrada para deletar",
        details: {
          numProjeto,
          assistente_investigacao,
          supervisor
        }
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Participação deletada com sucesso"
    });
  } catch (error) {
    console.error('Erro no controller ao deletar participação:', error);
    next(criarErro(500, {
      message: "Erro ao deletar participação",
      technicalDetails: error.message
    }));
  }
}

export async function atualizar(req, res, next) {
  try {
    const { numProjeto, assistente_investigacao, supervisor } = req.params;
    const { novoNumProjeto, novoAssistente, novoSupervisor } = req.body;
    
    console.log(`Atualizando participação: Projeto ${numProjeto}, Assistente ${assistente_investigacao}, Supervisor ${supervisor}`);
    console.log('Novos valores:', { novoNumProjeto, novoAssistente, novoSupervisor });
    
    // Primeiro deleta a relação antiga
    await deletarParticipacao(numProjeto, assistente_investigacao, supervisor);
    
    // Depois cria a nova relação
    const novaParticipacao = await criarParticipacao(
      novoNumProjeto || numProjeto,
      novoAssistente || assistente_investigacao,
      novoSupervisor || supervisor
    );
    
    res.status(200).json({
      success: true,
      data: novaParticipacao
    });
  } catch (error) {
    console.error('Erro no controller ao atualizar participação:', error);
    next(criarErro(500, {
      message: "Erro ao atualizar participação",
      technicalDetails: error.message
    }));
  }
}