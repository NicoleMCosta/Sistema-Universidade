import { getDb } from "../db/index.js";
import { ObjectId } from "mongodb";

const COLLECTION = "pesquisa";


export async function buscarTodasPesquisas() {
  const db = getDb();
  const res = await db.collection(COLLECTION).find().toArray;
  return res;
}

export async function criarPesquisa(numMatriculaProf, numProjeto) {
  const db = getDb();
  const novaPesquisa = {numMatriculaProf, numProjeto};
  const resultado = await db.collection(COLLECTION).insertOne(novaPesquisa);
  return { _id: resultado.insertedId, ...novaParticipacao };
}

export async function buscarPesquisa(numMatriculaProf, numProjeto) {
  const db = getDb();
  const res = await db.collection(COLLECTION).find({numMatriculaProf : parseInt(numMatriculaProf), numProjeto: parseInt(numProjeto)})
  return res;
}

export async function deletarPesquisa(numMatriculaProf, numProjeto) {
  const db = getDb();
  const res = await db.collection(COLLECTION).findOneAndDelete({numMatriculaProf : parseInt(numMatriculaProf), numProjeto: parseInt(numProjeto)});
  
  if (!numProjeto || !numMatriculaProf) {
    throw new Error("Falta algum parametro");
  }
  return res;
}
