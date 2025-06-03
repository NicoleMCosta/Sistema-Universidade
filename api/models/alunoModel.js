import { query } from "../db/index.js"
import { 
    buscarTodosEstudantesQuery,
    criarEstudanteQuery,
    buscarEstudanteQuery,
    atualizarEstudanteQuery,
    deletarEstudanteQuery,
} from "../db/sqlQuery.js"

export async function buscarTodosEstudantes() {
  const res = await query(buscarTodosEstudantesQuery);
  return res.rows; 
}

export async function criarEstudante(numMatriculaEstd, nome, idade, tipo_curso, numDept, numMatricula_aconselhador) {
  const res = await query(criarEstudanteQuery, [numMatriculaEstd, nome, idade, tipo_curso, numDept, numMatricula_aconselhador]);
  return res.rows[0]; 
}

export async function buscarEstudantePorMat(numMatriculaEstd) {
  const res = await query(buscarEstudanteQuery, [numMatriculaEstd]);
  return res.rows[0]; 
}

export async function atualizarEstudante(numMatriculaEstd, nome, idade, tipo_curso, numDept, numMatricula_aconselhador) {
  const res = await query(atualizarEstudanteQuery, [
    nome,
    idade,
    tipo_curso,
    numDept,
    numMatricula_aconselhador,
    numMatriculaEstd 
  ]);
  return res.rows[0]; 
}

export async function deletarEstudante(numMatriculaEstd) { 
  const res = await query(deletarEstudanteQuery, [numMatriculaEstd]);
  return res.rows[0]; 
}
