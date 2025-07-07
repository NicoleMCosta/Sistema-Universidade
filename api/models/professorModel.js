import { getDb } from "../db/index.js";
import { ObjectId } from "mongodb";

const COLLECTION = "professores";

export async function buscarTodosProfessores() {
  const db = getDb();
  const res = await db.collection(COLLECTION).find().toArray();
  return res;
}


export async function criarProfessor(numMatriculaProf, nome, idade, sala, especialidade_pesquisa, tempo, numDept) {
  const db = getDb();
  
  const novoProfessor = {numMatriculaProf: parseInt(numMatriculaProf), nome, idade, sala, especialidade_pesquisa, tempo, numDept: parseInt(numDept)};
  console.log(novoProfessor);
  
  const resultado = await db.collection(COLLECTION).insertOne(novoProfessor);
  console.log("🧪 Resultado do insertOne:", resultado);
  if (!resultado.acknowledged) {
    console.error("❌ Erro ao inserir professor");
    return null;
  }

  console.log("✅ Documento inserido:", resultado.insertedId);

  return { _id: resultado.insertedId, ...novoProfessor };

}

export async function buscarProfessorPorMatricula(numMatriculaProf) {
  const db = getDb();
  return await db.collection(COLLECTION).findOne({ numMatriculaProf: parseInt(numMatriculaProf) });
}

export async function atualizarProfessor(numMatriculaProf, nome, idade, sala, especialidade_pesquisa, tempo, numDept) {
  const db = getDb();
  const matriculaNum = parseInt(numMatriculaProf);
  const numDeptConvertido = parseInt(numDept);

  const atualizacao = {
    ...(nome && { nome }),
    ...(idade && { idade }),
    ...(sala && { sala }),
    ...(especialidade_pesquisa && { especialidade_pesquisa }),
    ...(tempo && { tempo }),
    ...(numDept && { numDeptConvertido })
  };

  console.log('Buscando professor com matrícula:', matriculaNum);
  console.log('Dados de atualização:', atualizacao);

  try {
    const resultado = await db.collection(COLLECTION).findOneAndUpdate(
      { numMatriculaProf: matriculaNum },
      { $set: atualizacao },
      { 
        returnDocument: "after",
        includeResultMetadata: true // Adiciona metadados completos
      }
    );

    console.log('Resultado completo da operação:', resultado);
    
    // Verificação correta para MongoDB 4.4+
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

export async function deletarProfessor(numMatriculaProf) {
   const db = getDb();
  const resultado = await db.collection(COLLECTION).deleteOne({
    numMatriculaProf: parseInt(numMatriculaProf)
  });

  return resultado.deletedCount > 0;
}