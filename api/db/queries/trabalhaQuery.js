export const buscarTrabalhoPorIdQuery = `
  SELECT * FROM trabalha
  WHERE liderDept = $1 AND numDept = $2 AND numMatriculaProf = $3`;

export const atualizarTrabalhoQuery = `
  UPDATE trabalha
  SET liderDept = $4,
      numDept = $5,
      numMatriculaProf = $6
  WHERE liderDept = $1 AND numDept = $2 AND numMatriculaProf = $3
  RETURNING *`;

export const buscarTodosTrabalhosQuery = `SELECT * FROM trabalha`;

export const criarTrabalhoQuery = `
  INSERT INTO trabalha (liderDept, numDept, numMatriculaProf)
  VALUES ($1, $2, $3)
  RETURNING *`;

export const deletarTrabalhoQuery = `
  DELETE FROM trabalha
  WHERE liderDept = $1 AND numDept = $2 AND numMatriculaProf = $3
  RETURNING *`;
