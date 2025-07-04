import { getDb } from "../db/index.js";
import { ObjectId } from "mongodb";

const COLLECTION = "professores";

export async function buscarTodosProfessores() {
  const db = getDb();
  const res = await db.collection(COLLECTION).find().toArray();
  return res;
}

export async function criarProfessor(numMatriculaProf, nome, idade, sala, especialidade_pesquisa, tempo) {
  const db = getDb();
  const novoProfessor = {numMatriculaProf, nome, idade, sala, especialidade_pesquisa, tempo};
  const resultado = await db.collection(COLLECTION).insertOne(novoProfessor);
  return { _id: resultado.insertedId, ...novoProfessor};
}

export async function buscarProfessorPorMatricula(numMatriculaProf) {
  const db = getDb();
  const res = await db.collection(COLLECTION).find({numMatriculaProf: parseInt(numMatriculaProf)});
  return res;
}

export async function atualizarProfessor(numMatriculaProf, nome, idade, sala, especialidade_pesquisa, tempo) {
  const db = getDb();
  const atualizacao = {
    ...(numMatriculaProf && {numMatriculaProf}),
    ...(nome && { nome }),
    ...(idade && {idade}),
    ...(sala && { sala }),
    ...(especialidade_pesquisa && { especialidade_pesquisa }),
    ...( tempo && { tempo })
  };

  if (Object.keys(atualizacao).length === 0) return null;

  const resultado = await db.collection(COLLECTION).findOneAndUpdate(
    { numMatriculaProf: parseInt(numMatriculaProf) },
    { $set: atualizacao },
    { returnDocument: "after" }
  );

  return resultado.value;
}

export async function deletarProfessor(numMatriculaProf) {
  const db = getDb();
  const res = await db.collection(COLLECTION).findOneAndDelete({numMatriculaProf: {numMatriculaProf}});
  return res.value;
}
