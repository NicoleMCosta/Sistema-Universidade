import { getDb } from "../db/index.js";
import { ObjectId } from "mongodb";

const COLLECTION = "departamentos";


export async function buscarTodosDepartamentos() {
  const db = getDb();
  return await db.collection(COLLECTION).find().toArray();
}

export async function criarDepartamento(numDept, nome, escritorio_principal) {
  const db = getDb();
  const novoDepartamento = { numDept, nome, escritorio_principal };

  const resultado = await db.collection(COLLECTION).insertOne(novoDepartamento);
  return { _id: resultado.insertedId, ...novoDepartamento };
}

export async function buscarDepartamentoPorId(numDept) {
  const db = getDb();
  return await db.collection(COLLECTION).findOne({ numDept: parseInt(numDept) });
}

export async function atualizarDepartamento(numDept, nome, escritorio_principal) {
  const db = getDb();

  const atualizacao = {
    ...(nome && { nome }),
    ...(escritorio_principal && { escritorio_principal })
  };

  if (Object.keys(atualizacao).length === 0) return null;

  const resultado = await db.collection(COLLECTION).findOneAndUpdate(
    { numDept: parseInt(numDept) },
    { $set: atualizacao },
    { returnDocument: "after" }
  );

  return resultado.value;
}

export async function deletarDepartamento(numDept) {
  const db = getDb();
  const resultado = await db.collection(COLLECTION).findOneAndDelete({ numDept: parseInt(numDept) });
  return resultado.value;
}
