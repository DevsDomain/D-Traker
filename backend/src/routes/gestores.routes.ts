import {Router} from 'express'
import GestorController from '../controllers/GestorController';

export const gestoresRoutes = Router();

gestoresRoutes.post("/gestor",GestorController.create)
gestoresRoutes.get("/gestores",GestorController.getAll)
gestoresRoutes.get("/gestor",GestorController.findGestor)
gestoresRoutes.post("/gestorProjeto",GestorController.vincularProjeto);


