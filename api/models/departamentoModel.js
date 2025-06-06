import { query } from "../db/index.js";
import {
  buscarTodosDepartamentosQuery,
  criarDepartamentoQuery,
  buscarDepartamentoQuery,
  atualizarDepartamentoQuery,
  deletarDepartamentoQuery,
} from "../db/queries/departamentosQuery.js";

export async function buscarTodosDepartamentos() {
  const res = await query(buscarTodosDepartamentosQuery);
  return res.rows;
}

export async function criarDepartamento(numDept, nome, escritorio_principal) {
  const res = await query(criarDepartamentoQuery, [numDept, nome, escritorio_principal]);
  return res.rows[0];
}

export async function buscarDepartamentoPorId(numDept) {
  const res = await query(buscarDepartamentoQuery, [numDept]);
  return res.rows[0];
}

export async function atualizarDepartamento(numDept, nome, escritorio_principal) {
  const res = await query(atualizarDepartamentoQuery, [nome, escritorio_principal, numDept]);
  return res.rows[0];
}

export async function deletarDepartamento(numDept) {
  const res = await query(deletarDepartamentoQuery, [numDept]);
  return res.rows[0];
}
