import { getDb } from "../db/index.js";
import { ObjectId } from "mongodb";

const COLLECTION = "pesquisa";

export async function buscarTodasPesquisas() {
  const db = getDb();
  try {
    const res = await db.collection(COLLECTION).find().toArray();
    console.log('Pesquisas encontradas:', res.length);
    return res || [];
  } catch (error) {
    console.error('Erro ao buscar pesquisas:', error);
    return [];
  }
}

export async function criarPesquisa(numMatriculaProf, numProjeto) {
  const db = getDb();
  const novaPesquisa = {
    numMatriculaProf: parseInt(numMatriculaProf),
    numProjeto: parseInt(numProjeto)
  };
  
  console.log('Criando nova pesquisa:', novaPesquisa);
  
  try {
    const resultado = await db.collection(COLLECTION).insertOne(novaPesquisa);
    return { 
      _id: resultado.insertedId, 
      ...novaPesquisa 
    };
  } catch (error) {
    console.error('Erro ao criar pesquisa:', error);
    throw error;
  }
}

export async function buscarPesquisa(numMatriculaProf, numProjeto) {
  const db = getDb();
  const query = {
    numMatriculaProf: parseInt(numMatriculaProf),
    numProjeto: parseInt(numProjeto)
  };
  
  console.log('Buscando pesquisa com:', query);
  
  try {
    const pesquisa = await db.collection(COLLECTION).findOne(query);
    console.log('Pesquisa encontrada:', pesquisa);
    return pesquisa;
  } catch (error) {
    console.error('Erro ao buscar pesquisa:', error);
    throw error;
  }
}

export async function deletarPesquisa(numMatriculaProf, numProjeto) {
  const db = getDb();
  const query = {
    numMatriculaProf: parseInt(numMatriculaProf),
    numProjeto: parseInt(numProjeto)
  };
  
  console.log('Deletando pesquisa com:', query);
  
  try {
    const resultado = await db.collection(COLLECTION).deleteOne(query);
    console.log('Resultado da deleção:', resultado);
    return resultado.deletedCount > 0;
  } catch (error) {
    console.error('Erro ao deletar pesquisa:', error);
    throw error;
  }
}