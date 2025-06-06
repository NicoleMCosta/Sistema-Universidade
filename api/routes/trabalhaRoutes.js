import express from 'express';
import {
  criar,
  buscarPorId,
  atualizar,
  deletar
} from '../controllers/trabalhaController.js';

const router = express.Router();

router.post('/', criar);
router.get('/:liderDept/:numDept/:numMatriculaProf', buscarPorId);
router.put('/:liderDept/:numDept/:numMatriculaProf', atualizar); 
router.delete('/:liderDept/:numDept/:numMatriculaProf', deletar);

export default router;
