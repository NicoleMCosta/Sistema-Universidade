import express from 'express';
import {
  criar,
  buscarPorId,
  atualizar,
  deletar
} from '../controllers/departamentoController.js';

const router = express.Router();

router.post('/', criar);
router.get('/:numDept', buscarPorId);
router.put('/:numDept', atualizar);
router.delete('/:numDept', deletar);

export default router;
