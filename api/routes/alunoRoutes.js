import express from "express"
import { 
    buscar,
    criar,
    buscarPorMat,
    atualizar,
    deletar
} from "../controllers/alunoController.js";

const router = express.Router();


router.get('/', buscar);                    
router.post('/', criar);                   
router.get('/:numMatriculaEstd', buscarPorMat);          
router.put('/:numMatriculaEstd', atualizar);             
router.delete('/:numMatriculaEstd', deletar);            



export default router;
