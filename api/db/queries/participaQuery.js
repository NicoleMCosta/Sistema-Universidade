export const buscarTodasParticipacoesQuery = `SELECT * FROM participa`;

export const criarParticipacaoQuery = `
  INSERT INTO participa (numProjeto, assistente_investigacao, supervisor)
  VALUES ($1, $2, $3)
  RETURNING *`;

export const deletarParticipacaoQuery = `
  DELETE FROM participa
  WHERE numProjeto = $1 AND assistente_investigacao = $2 AND supervisor = $3
  RETURNING *`;

export const buscarParticipacaoQuery = `
  SELECT * FROM participa
  WHERE numProjeto = $1 AND assistente_investigacao = $2 AND supervisor = $3`;

export const atualizarParticipacaoQuery = `
  UPDATE participa
  SET numProjeto = $4,
      assistente_investigacao = $5,
      supervisor = $6
  WHERE numProjeto = $1 AND assistente_investigacao = $2 AND supervisor = $3
  RETURNING *`;
