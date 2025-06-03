export const buscarTodosEstudantesQuery = `SELECT * FROM ESTUDANTES`;

export const criarEstudanteQuery = `INSERT INTO estudantes(
  numMatriculaEstd, nome, idade, tipo_curso, numDept, numMatricula_aconselhador
)
VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

export const buscarEstudanteQuery = `SELECT * FROM estudantes WHERE numMatriculaEstd = $1`;

export const atualizarEstudanteQuery = `
UPDATE estudantes
SET
  nome = COALESCE($1, nome),
  idade = COALESCE($2, idade),
  tipo_curso = COALESCE($3, tipo_curso),
  numDept = COALESCE($4, numDept),
  numMatricula_aconselhador = COALESCE($5, numMatricula_aconselhador)
WHERE
  numMatriculaEstd = $6
RETURNING *;
`;


export const deletarEstudanteQuery = `DELETE FROM estudantes WHERE numMatriculaEstd = $1 RETURNING *`;

    

//fazer outras queries