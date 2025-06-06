import express from "express"
import { 
    criar,
    buscarPorMat,
    atualizar,
    deletar
} from "../controllers/estudanteController.js";

const router = express.Router();
                   
router.post('/', criar);                   
router.get('/:numMatriculaEstd', buscarPorMat);          
router.put('/:numMatriculaEstd', atualizar);             
router.delete('/:numMatriculaEstd', deletar);            



export default router;
