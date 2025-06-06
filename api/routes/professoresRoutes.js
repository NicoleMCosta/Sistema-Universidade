import express from 'express';
import {
  criar,
  atualizar,
  deletar,
  buscarPorId
} from '../controllers/professorController.js';

const router = express.Router();

router.post('/', criar);
router.get('/:numMatriculaProf', buscarPorId);
router.put('/:numMatriculaProf', atualizar);
router.delete('/:numMatriculaProf', deletar);

export default router;
