export const buscarTodosDepartamentosQuery = `SELECT * FROM departamentos`;

export const buscarDepartamentoQuery = `SELECT * FROM departamentos WHERE numDept = $1`;

export const criarDepartamentoQuery = `
  INSERT INTO departamentos (numDept, nome, escritorio_principal)
  VALUES ($1, $2, $3)
  RETURNING *`;

export const atualizarDepartamentoQuery = `
  UPDATE departamentos
  SET nome = COALESCE($1, nome),
      escritorio_principal = COALESCE($2, escritorio_principal)
  WHERE numDept = $3
  RETURNING *`;

export const deletarDepartamentoQuery = `DELETE FROM departamentos WHERE numDept = $1 RETURNING *`;
