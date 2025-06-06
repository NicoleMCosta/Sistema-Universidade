export const buscarTodosProjetosQuery = `SELECT * FROM projetos`;

export const buscarProjetoQuery = `SELECT * FROM projetos WHERE numProjeto = $1`;

export const criarProjetoQuery = `
  INSERT INTO projetos (numProjeto, orgao_financiador, data_inicio, data_final, orcamento, pesquisador_principal)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *`;

export const atualizarProjetoQuery = `
  UPDATE projetos
  SET orgao_financiador = COALESCE($1, orgao_financiador),
      data_inicio = COALESCE($2, data_inicio),
      data_final = COALESCE($3, data_final),
      orcamento = COALESCE($4, orcamento),
      pesquisador_principal = COALESCE($5, pesquisador_principal)
  WHERE numProjeto = $6
  RETURNING *`;

export const deletarProjetoQuery = `DELETE FROM projetos WHERE numProjeto = $1 RETURNING *`;
