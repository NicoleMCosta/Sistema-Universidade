import {
  buscarParticipacao,
  criarParticipacao,
  deletarParticipacao
} from "../models/participaModel.js";
import { criarErro } from "../middlewares/erros.js";


export async function buscarPorId(req, res, next) {
  try {
    const { numProjeto, assistente_investigacao, supervisor } = req.params;
    const part = await buscarParticipacao(numProjeto, assistente_investigacao, supervisor);
    if (!part) return res.status(404).json({ erro: "Participação não encontrada" });
    res.status(200).json(part);
  } catch (error) {
    return next(criarErro(500, "Erro ao buscar participação"));
  }
}

export async function criar(req, res, next) {
  try {
    const { numProjeto, assistente_investigacao, supervisor } = req.body;
    if (!numProjeto || !assistente_investigacao || !supervisor) return res.status(400).json({ erro: "Campos obrigatórios ausentes" });
    const nova = await criarParticipacao(numProjeto, assistente_investigacao, supervisor);
    res.status(201).json(nova);
  } catch (error) {
    return next(criarErro(500, "Erro ao criar participação"));
  }
}

export async function deletar(req, res, next) {
  try {
    const { numProjeto, assistente_investigacao, supervisor } = req.params;
    const deletada = await deletarParticipacao(numProjeto, assistente_investigacao, supervisor);
    if (!deletada) return res.status(404).json({ erro: "Participação não encontrada para deletar" });
    res.status(200).json({ mensagem: "Participação deletada com sucesso" });
  } catch (error) {
    return next(criarErro(500, "Erro ao deletar participação"));
  }
}

//atualização em entidades N:N deleta e cria denovo 
export async function atualizar(req, res, next) {
  try {
    const { numProjeto, assistente_investigacao, supervisor } = req.params;
    await deletarParticipacao(numProjeto, assistente_investigacao, supervisor);
    const novaParticipacao = await criarParticipacao(numProjeto, assistente_investigacao, supervisor);
    res.status(200).json(novaParticipacao);
  } catch (error) {
    return next(criarErro(500, 'Erro ao atualizar participação'));
  }
}