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
    console.log('Criando departamento:', { numDept, nome, escritorio_principal });

    if (!numDept || !nome || !escritorio_principal) {
      return res.status(400).json({
        success: false,
        erro: "Todos os campos são obrigatórios",
        required: ["numDept", "nome", "escritorio_principal"]
      });
    }

    const novo = await criarDepartamento(numDept, nome, escritorio_principal);
    
    res.status(201).json({
      success: true,
      data: novo
    });
  } catch (err) {
    console.error('Erro no controller ao criar departamento:', err);
    next(criarErro(500, {
      message: "Erro ao criar departamento",
      technicalDetails: err.message
    }));
  }
}

export async function buscarPorId(req, res, next) {
  try {
    const { numDept } = req.params;
    console.log('Buscando departamento com numDept:', numDept);

    const departamento = await buscarDepartamentoPorId(numDept);
    
    if (!departamento) {
      console.warn('Departamento não encontrado');
      return res.status(404).json({ 
        success: false,
        erro: "Departamento não encontrado",
        details: {
          numDept,
          tipo: typeof numDept
        }
      });
    }

    res.status(200).json({
      success: true,
      data: departamento
    });
  } catch (err) {
    console.error('Erro no controller ao buscar departamento:', err);
    next(criarErro(500, {
      message: "Erro ao buscar departamento",
      technicalDetails: err.message
    }));
  }
}

export async function atualizar(req, res, next) {
  try {
    const { numDept } = req.params;
    const { nome, escritorio_principal } = req.body;
    console.log('Atualizando departamento:', numDept);
    console.log('Novos valores:', { nome, escritorio_principal });

    const atualizado = await atualizarDepartamento(numDept, nome, escritorio_principal);
    
    if (!atualizado) {
      console.warn('Departamento não encontrado para atualização');
      return res.status(404).json({ 
        success: false,
        erro: "Departamento não encontrado",
        details: {
          numDept,
          tipo: typeof numDept
        }
      });
    }

    res.status(200).json({
      success: true,
      data: atualizado
    });
  } catch (err) {
    console.error('Erro no controller ao atualizar departamento:', err);
    next(criarErro(500, {
      message: "Erro ao atualizar departamento",
      technicalDetails: err.message
    }));
  }
}

export async function deletar(req, res, next) {
  try {
    const { numDept } = req.params;
    console.log('Deletando departamento:', numDept);

    const deletado = await deletarDepartamento(numDept);
    
    if (!deletado) {
      console.warn('Departamento não encontrado para deleção');
      return res.status(404).json({ 
        success: false,
        erro: "Departamento não encontrado",
        details: {
          numDept,
          tipo: typeof numDept
        }
      });
    }

    res.status(200).json({
      success: true,
      message: "Departamento deletado com sucesso"
    });
  } catch (err) {
    console.error('Erro no controller ao deletar departamento:', err);
    next(criarErro(500, {
      message: "Erro ao deletar departamento",
      technicalDetails: err.message
    }));
  }
}