export const buscarTodasPesquisasQuery = `SELECT * FROM pesquisa`;

export const criarPesquisaQuery = `
  INSERT INTO pesquisa (numMatriculaProf, numProjeto)
  VALUES ($1, $2)
  RETURNING *`;

export const deletarPesquisaQuery = `
  DELETE FROM pesquisa WHERE numMatriculaProf = $1 AND numProjeto = $2
  RETURNING *`;

export const buscarPesquisaQuery = `
SELECT * FROM pesquisa
WHERE numMatriculaProf = $1 AND numProjeto = $2`;