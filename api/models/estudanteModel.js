import { getDb } from "../db/index.js";
import { ObjectId } from "mongodb";

const COLLECTION = "estudantes";


export async function buscarTodosEstudantes() {
  const db = getDb();
  try {
    const estudantes = await db.collection(COLLECTION).find().toArray();
    return estudantes || []; 
  } catch (error) {
    console.error('Erro ao buscar estudantes:', error);
    return []; 
  }
}

export async function criarEstudante(numMatriculaEstd, nome, idade, tipo_curso, numDept, numMatricula_aconselhador) {
  const db = getDb();
  const novoEstudante = { numMatriculaEstd: parseInt(numMatriculaEstd), nome, idade, tipo_curso, numDept, numMatricula_aconselhador };

  const resultado = await db.collection(COLLECTION).insertOne(novoEstudante);
  return { _id: resultado.insertedId, ...novoEstudante};
}

export async function buscarEstudantePorMat(numMatriculaEstd){
  const db = getDb();
  return await db.collection(COLLECTION).findOne({numMatriculaEstd: parseInt(numMatriculaEstd) });
}

export async function atualizarEstudante(numMatriculaEstd, nome, idade, tipo_curso, numDept, numMatricula_aconselhador) {
  const db = getDb();
  const matriculaNum = parseInt(numMatriculaEstd);

  const atualizacao = {
    ...(nome && { nome }),
    ...(idade && { idade: Number(idade) }),
    ...(tipo_curso && { tipo_curso }),
    ...(numDept && { numDept: Number(numDept) }),
    ...(numMatricula_aconselhador && { numMatricula_aconselhador: Number(numMatricula_aconselhador) })
  };

  console.log('Buscando estudante com matrícula:', matriculaNum);
  console.log('Dados de atualização:', atualizacao);

  try {
    const resultado = await db.collection(COLLECTION).findOneAndUpdate(
      { numMatriculaEstd: matriculaNum },
      { $set: atualizacao },
      { 
        returnDocument: "after",
        includeResultMetadata: true
      }
    );

    console.log('Resultado completo da operação:', resultado);
    
    if (resultado && resultado.value) {
      console.log('Documento atualizado com sucesso:', resultado.value);
      return resultado.value;
    }

    console.log('Nenhum documento foi atualizado');
    return null;
  } catch (error) {
    console.error('Erro durante a atualização:', error);
    throw error;
  }
}

export async function deletarEstudante(numMatriculaEstd) {
  const db = getDb();
  const resultado = await db.collection(COLLECTION).deleteOne({
    numMatriculaEstd: parseInt(numMatriculaEstd)
  });
  return resultado.deletedCount > 0;
}