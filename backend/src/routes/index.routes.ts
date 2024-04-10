import { Router } from 'express'
import { gestoresRoutes } from './gestores.routes';
import { gradeAtuacaoRoutes } from './gradeAtuacao.routes';
import cors from 'cors'

export const routes = Router();

routes.use(cors())
routes.use(gestoresRoutes)
routes.use(gradeAtuacaoRoutes)





