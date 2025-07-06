import { getDb } from "../db/index.js";
import { ObjectId } from "mongodb";

const COLLECTION = "trabalha";

export async function buscarTodosTrabalhos() {
  const db = getDb();
  try {
    const resultado = await db.collection(COLLECTION).find().toArray();
    console.log('Trabalhos encontrados:', resultado.length);
    return resultado || [];
  } catch (error) {
    console.error('Erro ao buscar trabalhos:', error);
    return [];
  }
}

export async function criarTrabalho(liderDept, numDept, numMatriculaProf) {
  const db = getDb();
  const novoTrabalho = {
    liderDept: parseInt(liderDept),
    numDept: parseInt(numDept),
    numMatriculaProf: parseInt(numMatriculaProf)
  };

  console.log('Criando novo trabalho:', novoTrabalho);

  try {
    const resultado = await db.collection(COLLECTION).insertOne(novoTrabalho);
    return { 
      _id: resultado.insertedId, 
      ...novoTrabalho 
    };
  } catch (error) {
    console.error('Erro ao criar trabalho:', error);
    throw error;
  }
}

export async function buscarTrabalho(liderDept, numDept, numMatriculaProf) {
  const db = getDb();
  const query = {
    liderDept: parseInt(liderDept),
    numDept: parseInt(numDept),
    numMatriculaProf: parseInt(numMatriculaProf)
  };

  console.log('Buscando trabalho com:', query);

  try {
    const trabalho = await db.collection(COLLECTION).findOne(query);
    console.log('Trabalho encontrado:', trabalho);
    return trabalho;
  } catch (error) {
    console.error('Erro ao buscar trabalho:', error);
    throw error;
  }
}

export async function deletarTrabalho(liderDept, numDept, numMatriculaProf) {
  const db = getDb();
  const query = {
    liderDept: parseInt(liderDept),
    numDept: parseInt(numDept),
    numMatriculaProf: parseInt(numMatriculaProf)
  };

  console.log('Deletando trabalho com:', query);

  try {
    const resultado = await db.collection(COLLECTION).deleteOne(query);
    console.log('Resultado da deleção:', resultado);
    return resultado.deletedCount > 0;
  } catch (error) {
    console.error('Erro ao deletar trabalho:', error);
    throw error;
  }
}