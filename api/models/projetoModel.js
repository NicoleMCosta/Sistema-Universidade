import { getDb } from "../db/index.js";
import { ObjectId } from "mongodb";

const COLLECTION = "projetos";

export async function buscarTodosProjetos() {
  const db = getDb();
  try {
    const res = await db.collection(COLLECTION).find().toArray();
    return res || [];
  } catch (error) {
    console.error('Erro detalhado:', error); 
    return []; 
  }
}

export async function criarProjeto(numProjeto, orgao_financiador, data_inicio, data_final, orcamento, pesquisador_principal, participantes =[], assistentes_pesquisa =[]) {
  const db = getDb();
  const novoProjeto = {numProjeto: parseInt(numProjeto), orgao_financiador, data_inicio, data_final, orcamento, pesquisador_principal: parseInt(pesquisador_principal), participantes, assistentes_pesquisa};
  const resultado = await db.collection(COLLECTION).insertOne(novoProjeto);
  return { _id: resultado.insertedId, ...novoProjeto};
}

export async function buscarProjetoPorId(numProjeto) {
  const db = getDb();
  const res = await db.collection(COLLECTION).find({buscarProjetoQuery: parseInt(numProjeto)});
  return res;
}

export async function atualizarProjeto(numProjeto, orgao_financiador, data_inicio, data_final, orcamento, pesquisador_principal, participantes = [], assistentes_pesquisa=[]) {
  const db = getDb();
  
  const numProjetoInt = parseInt(numProjeto);

  const atualizacao = {
    ...(orgao_financiador && { orgao_financiador }),
    ...(data_inicio && { data_inicio }),
    ...(data_final && { data_final }),
    ...(orcamento && { orcamento: Number(orcamento) }),
    ...(pesquisador_principal && { pesquisador_principal: Number(pesquisador_principal) }),
    ...(Array.isArray(participantes) && {participantes: participantes.map(p => parseInt(p, 10)).filter(p => !isNaN(p))}),
    ...(Array.isArray(assistentes_pesquisa) && {assistentes_pesquisa: assistentes_pesquisa.map(p => parseInt(p, 10)).filter(p => !isNaN(p))})
  };
  

  console.log('Atualizando projeto:', numProjetoInt);
  console.log('Dados de atualização:', atualizacao);

  try {
    const resultado = await db.collection(COLLECTION).findOneAndUpdate(
      { numProjeto: numProjetoInt },
      { $set: atualizacao },
      { 
        returnDocument: "after",
        includeResultMetadata: true // Para debug
      }
    );

    console.log('Resultado da atualização:', resultado);
    
    if (resultado && resultado.value) {
      return resultado.value;
    }
    return null;
  } catch (error) {
    console.error('Erro no model ao atualizar projeto:', error);
    throw error;
  }
}

export async function deletarProjeto(numProjeto) {
  const db = getDb();
  const numProjetoInt = parseInt(numProjeto);

  console.log('Deletando projeto:', numProjetoInt);
  
  try {
    const resultado = await db.collection(COLLECTION).deleteOne({ 
      numProjeto: numProjetoInt 
    });
    
    console.log('Resultado da deleção:', resultado);
    return resultado.deletedCount > 0;
  } catch (error) {
    console.error('Erro no model ao deletar projeto:', error);
    throw error;
  }
}