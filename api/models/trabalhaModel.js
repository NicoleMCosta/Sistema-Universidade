import { query } from "../db/index.js";
import {
  buscarTodosTrabalhosQuery,
  criarTrabalhoQuery,
  buscarTrabalhoPorIdQuery,
  deletarTrabalhoQuery,
} from "../db/queries/trabalhaQuery.js";

export async function buscarTodosTrabalhos() {
  const res = await query(buscarTodosTrabalhosQuery);
  return res.rows;
}

export async function criarTrabalho(liderDept, numDept, numMatriculaProf) {
  const res = await query(criarTrabalhoQuery, [liderDept, numDept, numMatriculaProf]);
  return res.rows[0];
}

export async function buscarTrabalho(liderDept, numDept, numMatriculaProf) {
  const res = await query(buscarTrabalhoPorIdQuery, [liderDept, numDept, numMatriculaProf]);
  return res.rows[0];
}

export async function deletarTrabalho(liderDept, numDept, numMatriculaProf) {
  const res = await query(deletarTrabalhoQuery, [liderDept, numDept, numMatriculaProf]);
  return res.rows[0];
}
