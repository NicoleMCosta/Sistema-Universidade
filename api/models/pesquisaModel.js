import { query } from "../db/index.js";
import {
  buscarTodasPesquisasQuery,
  criarPesquisaQuery,
  buscarPesquisaQuery,
  deletarPesquisaQuery,
} from "../db/queries/pesquisaQuery.js";

export async function buscarTodasPesquisas() {
  const res = await query(buscarTodasPesquisasQuery);
  return res.rows;
}

export async function criarPesquisa(numMatriculaProf, numProjeto) {
  const res = await query(criarPesquisaQuery, [numMatriculaProf, numProjeto]);
  return res.rows[0];
}

export async function buscarPesquisa(numMatriculaProf, numProjeto) {
  const res = await query(buscarPesquisaQuery, [numMatriculaProf, numProjeto]);
  return res.rows[0];
}

export async function deletarPesquisa(numMatriculaProf, numProjeto) {
  const res = await query(deletarPesquisaQuery, [numMatriculaProf, numProjeto]);
  return res.rows[0];
}
