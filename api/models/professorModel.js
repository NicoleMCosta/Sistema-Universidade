import { query } from "../db/index.js";
import {
  buscarTodosProfessoresQuery,
  criarProfessorQuery,
  buscarProfessorQuery,
  atualizarProfessorQuery,
  deletarProfessorQuery,
} from "../db/queries/professorQuery.js";

export async function buscarTodosProfessores() {
  const res = await query(buscarTodosProfessoresQuery);
  return res.rows;
}

export async function criarProfessor(numMatriculaProf, nome, idade, sala, especialidade_pesquisa, tempo) {
  const res = await query(criarProfessorQuery, [numMatriculaProf, nome, idade, sala, especialidade_pesquisa, tempo]);
  return res.rows[0];
}

export async function buscarProfessorPorMatricula(numMatriculaProf) {
  const res = await query(buscarProfessorQuery, [numMatriculaProf]);
  return res.rows[0];
}

export async function atualizarProfessor(numMatriculaProf, nome, idade, sala, especialidade_pesquisa, tempo) {
  const res = await query(atualizarProfessorQuery, [nome, idade, sala, especialidade_pesquisa, tempo, numMatriculaProf]);
  return res.rows[0];
}

export async function deletarProfessor(numMatriculaProf) {
  const res = await query(deletarProfessorQuery, [numMatriculaProf]);
  return res.rows[0];
}
