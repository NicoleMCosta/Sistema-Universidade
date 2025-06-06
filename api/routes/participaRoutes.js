import express from 'express';
import {
  criar,
  buscarPorId,
  atualizar,
  deletar
} from '../controllers/participaController.js';

const router = express.Router();

router.post('/', criar);
router.get('/:numProjeto/:assistente_investigacao/:supervisor', buscarPorId);
router.put('/:numProjeto/:assistente_investigacao/:supervisor', atualizar);
router.delete('/:numProjeto/:assistente_investigacao/:supervisor', deletar);

export default router;
