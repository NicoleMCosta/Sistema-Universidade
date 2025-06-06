import { query } from "../db/index.js";
import {
  buscarTodasParticipacoesQuery,
  criarParticipacaoQuery,
  buscarParticipacaoQuery,
  deletarParticipacaoQuery,
} from "../db/queries/participaQuery.js";

export async function buscarTodasParticipacoes() {
  const res = await query(buscarTodasParticipacoesQuery);
  return res.rows;
}

export async function criarParticipacao(numProjeto, assistente_investigacao, supervisor) {
  const res = await query(criarParticipacaoQuery, [numProjeto, assistente_investigacao, supervisor]);
  return res.rows[0];
}

export async function buscarParticipacao(numProjeto, assistente_investigacao, supervisor) {
  const res = await query(buscarParticipacaoQuery, [numProjeto, assistente_investigacao, supervisor]);
  return res.rows[0];
}

export async function deletarParticipacao(numProjeto, assistente_investigacao, supervisor) {
  const res = await query(deletarParticipacaoQuery, [numProjeto, assistente_investigacao, supervisor]);
  return res.rows[0];
}
