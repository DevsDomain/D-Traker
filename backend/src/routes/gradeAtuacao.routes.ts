import { Router } from 'express'
import GradeAtuacaoController from '../controllers/GradeAtuacaoController';

export const gradeAtuacaoRoutes = Router();

gradeAtuacaoRoutes.get("/gradeAtuacao", GradeAtuacaoController.getAll);
gradeAtuacaoRoutes.get("/admin", GradeAtuacaoController.Admin)