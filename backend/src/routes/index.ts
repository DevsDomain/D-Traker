import {Router} from 'express'
import CruzeiroController from '../controllers/CruzeiroController';
import cors from 'cors'

export const routes = Router();

routes.use(cors())
routes.get("/",CruzeiroController.getAll);
routes.get("/one",CruzeiroController.getUnique)
routes.get("/admin",CruzeiroController.Admin)
