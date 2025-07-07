import { getDb } from "../db/index.js";
import { ObjectId } from "mongodb";

const COLLECTION = "departamentos";

export async function buscarTodosDepartamentos() {
  const db = getDb();
  try {
    const departamentos = await db.collection(COLLECTION).find().toArray();
    console.log('Departamentos encontrados:', departamentos.length);
    return departamentos || [];
  } catch (error) {
    console.error('Erro ao buscar departamentos:', error);
    return [];
  }
}

export async function criarDepartamento(numDept, nome, escritorio_principal, numMatriculaProf) {
  const db = getDb();

  const novoDepartamento = {
    numDept: parseInt(numDept),
    nome,
    escritorio_principal, 
    numMatriculaProf: parseInt(numMatriculaProf)
  };

  console.log('Criando novo departamento:', novoDepartamento);

  try {
    const resultado = await db.collection(COLLECTION).insertOne(novoDepartamento);
    return { 
      _id: resultado.insertedId, 
      ...novoDepartamento 
    };
  } catch (error) {
    console.error('Erro ao criar departamento:', error);
    throw error;
  }
}

export async function buscarDepartamentoPorId(numDept) {
  const db = getDb();
  const numDeptInt = parseInt(numDept);

  console.log('Buscando departamento com numDept:', numDeptInt);

  try {
    const departamento = await db.collection(COLLECTION).findOne({ numDept: numDeptInt });
    console.log('Departamento encontrado:', departamento);
    return departamento;
  } catch (error) {
    console.error('Erro ao buscar departamento:', error);
    throw error;
  }
}

export async function atualizarDepartamento(numDept, nome, escritorio_principal, numMatriculaProf) {
  const db = getDb();
  const numDeptInt = parseInt(numDept);

  const atualizacao = {
    ...(nome && { nome }),
    ...(escritorio_principal && { escritorio_principal }),
    ...(numMatriculaProf && {numMatriculaProf: parseInt(numMatriculaProf)})
  };

  console.log('Atualizando departamento:', numDeptInt);
  console.log('Dados de atualização:', atualizacao);

  try {
    const resultado = await db.collection(COLLECTION).findOneAndUpdate(
      { numDept: numDeptInt },
      { $set: atualizacao },
      { 
        returnDocument: "after",
        includeResultMetadata: true
      }
    );

    console.log('Resultado da atualização:', resultado);
    
    if (resultado && resultado.value) {
      return resultado.value;
    }
    return null;
  } catch (error) {
    console.error('Erro ao atualizar departamento:', error);
    throw error;
  }
}

export async function deletarDepartamento(numDept) {
  const db = getDb();
  const numDeptInt = parseInt(numDept);

  console.log('Deletando departamento:', numDeptInt);

  try {
    const resultado = await db.collection(COLLECTION).deleteOne({ 
      numDept: numDeptInt 
    });
    
    console.log('Resultado da deleção:', resultado);
    return resultado.deletedCount > 0;
  } catch (error) {
    console.error('Erro ao deletar departamento:', error);
    throw error;
  }
}