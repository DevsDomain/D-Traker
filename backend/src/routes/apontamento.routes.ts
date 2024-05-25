import { Router } from "express";
import ApontamentoAlteracaoController from "../controllers/ApontamentoAlteracaoController";

export const apontamentoRoutes = Router();

apontamentoRoutes.get("/alteracao", ApontamentoAlteracaoController.getAll);

