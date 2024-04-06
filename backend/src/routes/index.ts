import {Router} from 'express'
import GradeAtuacaoController from '../controllers/GradeAtuacaoController';
import GestorController from '../controllers/GestorController';
import cors from 'cors'

export const routes = Router();

routes.use(cors())
routes.get("/",GradeAtuacaoController.getAll);
routes.get("/one",GradeAtuacaoController.getUnique)
routes.get("/admin",GradeAtuacaoController.Admin)
routes.post("/admin",GestorController.create)
routes.get("/gestores",GestorController.getAll)
routes.get("/gestor",GestorController.findGestor)
routes.post("/gestorProjeto",GestorController.vincularProjeto);
routes.post("/michael",GestorController.MichaelGambiarra);



