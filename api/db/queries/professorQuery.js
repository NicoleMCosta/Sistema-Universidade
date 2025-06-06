export const buscarTodosProfessoresQuery = `SELECT * FROM professores`;

export const buscarProfessorQuery = `SELECT * FROM professores WHERE numMatriculaProf = $1`;

export const criarProfessorQuery = `
  INSERT INTO professores (numMatriculaProf, nome, idade, sala, especialidade_pesquisa, tempo)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *`;

export const atualizarProfessorQuery = `
  UPDATE professores
  SET nome = COALESCE($1, nome),
      idade = COALESCE($2, idade),
      sala = COALESCE($3, sala),
      especialidade_pesquisa = COALESCE($4, especialidade_pesquisa),
      tempo = COALESCE($5, tempo)
  WHERE numMatriculaProf = $6
  RETURNING *`;

export const deletarProfessorQuery = `DELETE FROM professores WHERE numMatriculaProf = $1 RETURNING *`;
