import {
  criarDepartamento,
  buscarDepartamentoPorId,
  atualizarDepartamento,
  deletarDepartamento
} from "../models/departamentoModel.js";
import { criarErro } from "../middlewares/erros.js";

export async function criar(req, res, next) {
  try {
    const { numDept, nome, escritorio_principal } = req.body;
    if (!numDept || !nome || !escritorio_principal)
      return res.status(400).json({ erro: "Todos os campos são obrigatórios" });

    const novo = await criarDepartamento(numDept, nome, escritorio_principal);
    res.status(201).json(novo);
  } catch (err) {
    next(criarErro(500, "Erro ao criar departamento"));
  }
}

export async function buscarPorId(req, res, next) {
  try {
    const { numDept } = req.params;
    const departamento = await buscarDepartamentoPorId(numDept);
    if (!departamento) return res.status(404).json({ erro: "Departamento não encontrado" });

    res.status(200).json(departamento);
  } catch (err) {
    next(criarErro(500, "Erro ao buscar departamento"));
  }
}

export async function atualizar(req, res, next) {
  try {
    const { numDept } = req.params;
    const { nome, escritorio_principal } = req.body;

    const atualizado = await atualizarDepartamento(numDept, nome, escritorio_principal);
    if (!atualizado) return res.status(404).json({ erro: "Departamento não encontrado" });

    res.status(200).json(atualizado);
  } catch (err) {
    next(criarErro(500, "Erro ao atualizar departamento"));
  }
}

export async function deletar(req, res, next) {
  try {
    const { numDept } = req.params;
    const deletado = await deletarDepartamento(numDept);
    if (!deletado) return res.status(404).json({ erro: "Departamento não encontrado" });

    res.status(200).json({ message: "Departamento deletado com sucesso" });
  } catch (err) {
    next(criarErro(500, "Erro ao deletar departamento"));
  }
}
