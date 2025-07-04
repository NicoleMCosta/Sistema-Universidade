import { getDb } from "../db/index.js";
import { ObjectId } from "mongodb";

const COLLECTION = "trabalha";

export async function buscarTodosTrabalhos() {
  const db = getDb();
  const res = await db.collection(COLLECTION).find().toArray();
    return res;
}

export async function criarTrabalho(liderDept, numDept, numMatriculaProf) {
  const db = getDb();
  const novoTrabalho = {liderDept, numDept, numMatriculaProf};
  const res = await db.COLLECTION.insertOne(novoTrabalho);
 
  return { _id: resultado.insertedId, ...novoTrabalho};
}

export async function buscarTrabalho(liderDept, numDept, numMatriculaProf) {
  const db = getDb();
  const res = await db.collection(COLLECTION).find({liderDept: parseInt(liderDept), numDept: parseInt(numDept), numMatriculaProf: parseInt(numMatriculaProf)});
  return res;
}

export async function deletarTrabalho(liderDept, numDept, numMatriculaProf) {
  const db = getDb();
  const res = await db.collection(COLLECTION).findOneAndDelete({
    liderDept: parseInt(liderDept), 
    numDept: parseInt(numDept), 
    numMatriculaProf: parseInt(numMatriculaProf)});

  if (!liderDept || !numDept || !numMatriculaProf) {
    throw new Error("Falta algum parametro");
  }
  
  return res.value;
}
