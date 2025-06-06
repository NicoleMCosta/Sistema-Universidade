import express from 'express';
import {
  criar,
  buscarPorId,
  atualizar,
  deletar
} from '../controllers/projetoController.js';

const router = express.Router();

router.post('/', criar);
router.get('/:numProjeto', buscarPorId);
router.put('/:numProjeto', atualizar);
router.delete('/:numProjeto', deletar);

export default router;
