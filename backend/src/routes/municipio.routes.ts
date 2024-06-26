import { Router } from 'express'
import MunicipioController from '../controllers/MunicipioController';

export const municipioRoutes = Router();

municipioRoutes.get("/municipios", MunicipioController.getAll);
municipioRoutes.get("/admin",MunicipioController.Admin)
municipioRoutes.post("/gestorProjeto",MunicipioController.vincularProjeto);
municipioRoutes.get("/meusProjetos",MunicipioController.municipioProjeto);
municipioRoutes.get("/totalkm",MunicipioController.totalArea);
