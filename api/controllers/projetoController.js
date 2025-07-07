import {
  criarProjeto,
  buscarProjetoPorId,
  atualizarProjeto,
  deletarProjeto,
} from "../models/projetoModel.js";
import { criarErro } from "../middlewares/erros.js";

export async function criar(req, res, next) {
  try {
    const { numProjeto, orgao_financiador, data_inicio, data_final, orcamento, pesquisador_principal, participantes } = req.body;
    const resultado = await criarProjeto(numProjeto, orgao_financiador, data_inicio, data_final, orcamento, pesquisador_principal, participantes);
    res.status(201).json(resultado);
  } catch (erro) {
    next(criarErro(500, "Erro ao criar projeto"));
  }
}

export async function buscarPorId(req, res, next) {
  try {
    const { numProjeto } = req.params;
    const resultado = await buscarProjetoPorId(numProjeto);
    if (!resultado) return res.status(404).json({ erro: "Projeto não encontrado" });
    res.status(200).json(resultado);
  } catch (erro) {
    next(criarErro(500, "Erro ao buscar projeto"));
  }
}

export async function atualizar(req, res, next) {
  try {
    const { numProjeto } = req.params;
    const { orgao_financiador, data_inicio, data_final, orcamento, pesquisador_principal, participantes} = req.body;

    console.log('Iniciando atualização do projeto:', numProjeto);
    const resultado = await atualizarProjeto(
      numProjeto,
      orgao_financiador,
      data_inicio,
      data_final,
      orcamento,
      pesquisador_principal,
      participantes
    );

    if (!resultado) {
      console.warn('Projeto não encontrado para atualização');
      return res.status(404).json({ 
        success: false,
        erro: "Projeto não encontrado",
        details: {
          numProjeto,
          tipo: typeof numProjeto
        }
      });
    }

    res.status(200).json({
      success: true,
      data: resultado
    });
  } catch (erro) {
    console.error('Erro no controller ao atualizar projeto:', erro);
    next(criarErro(500, {
      message: "Erro ao atualizar projeto",
      technicalDetails: erro.message
    }));
  }
}


export async function deletar(req, res, next) {
  try {
    const { numProjeto } = req.params;
    console.log('Iniciando deleção do projeto:', numProjeto);

    const resultado = await deletarProjeto(numProjeto);
    
    if (!resultado) {
      console.warn('Projeto não encontrado para deleção');
      return res.status(404).json({ 
        success: false,
        erro: "Projeto não encontrado",
        details: {
          numProjeto,
          tipo: typeof numProjeto
        }
      });
    }

    res.status(200).json({
      success: true,
      message: "Projeto deletado com sucesso"
    });
  } catch (erro) {
    console.error('Erro no controller ao deletar projeto:', erro);
    next(criarErro(500, {
      message: "Erro ao deletar projeto",
      technicalDetails: erro.message
    }));
  }
}
