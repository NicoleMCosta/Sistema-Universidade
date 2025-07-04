import { getDb } from "../db/index.js";
import { ObjectId } from "mongodb";

const COLLECTION = "projetos";

export async function buscarTodosProjetos() {
  const db = getDb();
  const res = await db.collection(COLLECTION).find().toArray();
  return res;
}

export async function criarProjeto(numProjeto, orgao_financiador, data_inicio, data_final, orcamento, pesquisador_principal) {
  const db = getDb();
  const novoProjeto = {numProjeto, orgao_financiador, data_inicio, data_final, orcamento, pesquisador_principal};
  const resultado = await db.collection(COLLECTION).insertOne(novoProjeto);
  return { _id: resultado.insertedId, ...novoProjeto};
}

export async function buscarProjetoPorId(numProjeto) {
  const db = getDb();
  const res = await db.collection(COLLECTION).find({buscarProjetoQuery: parseInt(numProjeto)});
  return res;
}

export async function atualizarProjeto(numProjeto, orgao_financiador, data_inicio, data_final, orcamento, pesquisador_principal) {
  const db = getDb();
  const atualizacao = {
    ...(numProjeto && {numProjeto}),
    ...(orgao_financiador && { orgao_financiador }),
    ...(data_inicio && {data_inicio}),
    ...(data_final && { data_final }),
    ...(orcamento && { orcamento }),
    ...( pesquisador_principal && { pesquisador_principal})
  };

  if (Object.keys(atualizacao).length === 0) return null;

  const resultado = await db.collection(COLLECTION).findOneAndUpdate(
    { numProjeto: parseInt(numProjeto) },
    { $set: atualizacao },
    { returnDocument: "after" }
  );

  return resultado.value;
}

export async function deletarProjeto(numProjeto) {
  const db = getDb();
  const res = await db.collection(COLLECTION).findOneAndDelete({numProjeto: parseInt(numProjeto)});
  return res.value;
}
