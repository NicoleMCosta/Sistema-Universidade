import { getDb } from "../db/index.js";
import { ObjectId } from "mongodb";

const COLLECTION = "participa";

export async function buscarTodasParticipacoes() {
  const db = getDb();
  const resultado = await db.collection(COLLECTION).find().toArray();
  return resultado;
}

export async function criarParticipacao(numProjeto, assistente_investigacao, supervisor) {
  const db = getDb();
  const novaParticipacao = { numProjeto, assistente_investigacao, supervisor };

  const resultado = await db.collection(COLLECTION).insertOne(novaParticipacao);
  return { _id: resultado.insertedId, ...novaParticipacao };
}

export async function buscarParticipacao(numProjeto, assistente_investigacao, supervisor){
  const db = getDb();
  return await db.collection(COLLECTION).find({
    numProjeto: parseInt(numProjeto),
    assistente_investigacao: parseInt(assistente_investigacao),
    supervisor: parseInt(supervisor)
  });
}

export async function deletarParticipacao(numProjeto, assistente_investigacao, supervisor) {
  const db = getDb();
  const resultado = await db.collection(COLLECTION).findOneAndDelete({
    numProjeto: parseInt(numProjeto),
    assistente_investigacao: parseInt(assistente_investigacao),
    supervisor: parseInt(supervisor)
  });

  if (!numProjeto || !assistente_investigacao || !supervisor) {
    throw new Error("Falta algum parametro");
  }
  
  return resultado.value;
}
