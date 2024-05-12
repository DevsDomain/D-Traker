import {Router} from 'express'
import UsuarioController from '../controllers/UsuarioController';

export const UsuariosRoutes = Router();

UsuariosRoutes.get("/usuarios",UsuarioController.getAll)
UsuariosRoutes.post("/findUser",UsuarioController.findOneUsuario)


