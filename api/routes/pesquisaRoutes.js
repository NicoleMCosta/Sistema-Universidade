import express from 'express';
import {
  criar,
  buscarPorId,
  atualizar,
  deletar
} from '../controllers/pesquisaController.js';

const router = express.Router();

router.post('/', criar);
router.get('/:numMatriculaProf/:numProjeto', buscarPorId);
router.put('/:numMatriculaProf/:numProjeto', atualizar); 
router.delete('/:numMatriculaProf/:numProjeto', deletar);

export default router;
