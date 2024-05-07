import { Router } from "express";
import { gestoresRoutes } from "./gestores.routes";
import { UsuariosRoutes } from "./usuarios.routes";
import { gradeAtuacaoRoutes } from "./gradeAtuacao.routes";
import { municipioRoutes } from "./municipio.routes";
import cors from "cors";

export const routes = Router();

routes.use(cors());
routes.use(gestoresRoutes);
routes.use(gradeAtuacaoRoutes);
routes.use(UsuariosRoutes);
routes.use(municipioRoutes);
