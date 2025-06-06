import { query } from "../db/index.js";
import {
  buscarTodosProjetosQuery,
  criarProjetoQuery,
  buscarProjetoQuery,
  atualizarProjetoQuery,
  deletarProjetoQuery,
} from "../db/queries/projetoQuery.js";

export async function buscarTodosProjetos() {
  const res = await query(buscarTodosProjetosQuery);
  return res.rows;
}

export async function criarProjeto(numProjeto, orgao_financiador, data_inicio, data_final, orcamento, pesquisador_principal) {
  const res = await query(criarProjetoQuery, [numProjeto, orgao_financiador, data_inicio, data_final, orcamento, pesquisador_principal]);
  return res.rows[0];
}

export async function buscarProjetoPorId(numProjeto) {
  const res = await query(buscarProjetoQuery, [numProjeto]);
  return res.rows[0];
}

export async function atualizarProjeto(numProjeto, orgao_financiador, data_inicio, data_final, orcamento, pesquisador_principal) {
  const res = await query(atualizarProjetoQuery, [orgao_financiador, data_inicio, data_final, orcamento, pesquisador_principal, numProjeto]);
  return res.rows[0];
}

export async function deletarProjeto(numProjeto) {
  const res = await query(deletarProjetoQuery, [numProjeto]);
  return res.rows[0];
}
