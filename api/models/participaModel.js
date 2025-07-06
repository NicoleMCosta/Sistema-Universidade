import { getDb } from "../db/index.js";
import { ObjectId } from "mongodb";

const COLLECTION = "participa";

export async function buscarTodasParticipacoes() {
  const db = getDb();
  try {
    const resultado = await db.collection(COLLECTION).find().toArray();
    console.log('Participações encontradas:', resultado.length);
    return resultado || [];
  } catch (error) {
    console.error('Erro ao buscar participações:', error);
    return [];
  }
}

export async function criarParticipacao(numProjeto, assistente_investigacao, supervisor) {
  const db = getDb();
  const novaParticipacao = {
    numProjeto: parseInt(numProjeto),
    assistente_investigacao: parseInt(assistente_investigacao),
    supervisor: parseInt(supervisor)
  };

  console.log('Criando nova participação:', novaParticipacao);

  try {
    const resultado = await db.collection(COLLECTION).insertOne(novaParticipacao);
    return { 
      _id: resultado.insertedId, 
      ...novaParticipacao 
    };
  } catch (error) {
    console.error('Erro ao criar participação:', error);
    throw error;
  }
}

export async function buscarParticipacao(numProjeto, assistente_investigacao, supervisor) {
  const db = getDb();
  const query = {
    numProjeto: parseInt(numProjeto),
    assistente_investigacao: parseInt(assistente_investigacao),
    supervisor: parseInt(supervisor)
  };

  console.log('Buscando participação com:', query);

  try {
    const participacao = await db.collection(COLLECTION).findOne(query);
    console.log('Participação encontrada:', participacao);
    return participacao;
  } catch (error) {
    console.error('Erro ao buscar participação:', error);
    throw error;
  }
}

export async function deletarParticipacao(numProjeto, assistente_investigacao, supervisor) {
  const db = getDb();
  const query = {
    numProjeto: parseInt(numProjeto),
    assistente_investigacao: parseInt(assistente_investigacao),
    supervisor: parseInt(supervisor)
  };

  console.log('Deletando participação com:', query);

  try {
    const resultado = await db.collection(COLLECTION).deleteOne(query);
    console.log('Resultado da deleção:', resultado);
    return resultado.deletedCount > 0;
  } catch (error) {
    console.error('Erro ao deletar participação:', error);
    throw error;
  }
}