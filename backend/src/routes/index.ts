import {Router} from 'express'
import CruzeiroController from '../controllers/CruzeiroController';
export const routes = Router();

routes.get("/",CruzeiroController.getAll);
routes.get("/one",CruzeiroController.getUnique)
routes.get("/admin",CruzeiroController.Admin)
