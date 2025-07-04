import { getDb } from "../db/index.js";
import { ObjectId } from "mongodb";

const COLLECTION = "estudantes";


export async function buscarTodosEstudantes() {
  const db = getDb();
  return await db.collection(COLLECTION).findOne().toArray();
}


export async function criarEstudante(numMatriculaEstd, nome, idade, tipo_curso, numDept, numMatricula_aconselhador) {
  const db = getDb();
  const novoEstudante = { numMatriculaEstd, nome, idade, tipo_curso, numDept, numMatricula_aconselhador };

  const resultado = await db.collection(COLLECTION).insertOne(novoEstudante);
  return { _id: resultado.insertedId, ...novoEstudante};
}

export async function buscarEstudantePorMat(numMatriculaEstd){
  const db = getDb();
  return await db.collection(COLLECTION).findOne({numMatriculaEstd: parseInt(numMatriculaEstd) });
}

export async function atualizarEstudante(numMatriculaEstd, nome, idade, tipo_curso, numDept, numMatricula_aconselhador)  {
  const db = getDb();

  const atualizacao = {
    ...(numMatriculaEstd && {numMatriculaEstd}),
    ...(nome && { nome }),
    ...(tipo_curso && { tipo_curso }),
    ...(numDept && { numDept }),
    ...( numMatricula_aconselhador && { numMatricula_aconselhador })
  };

  if (Object.keys(atualizacao).length === 0) return null;

  const resultado = await db.collection(COLLECTION).findOneAndUpdate(
    { numMatriculaEstd: parseInt(numMatriculaEstd) },
    { $set: atualizacao },
    { returnDocument: "after" }
  );

  return resultado.value;
}

export async function deletarEstudante(numMatriculaEstd) {
  const db = getDb();
  const resultado = await db.collection(COLLECTION).findOneAndDelete({numMatriculaEstd: parseInt(numMatriculaEstd) });
  return resultado.value;
}
