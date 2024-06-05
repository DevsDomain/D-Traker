import { Router } from 'express'
import GradeAtuacaoController from '../controllers/GradeAtuacaoController';

export const gradeAtuacaoRoutes = Router();

gradeAtuacaoRoutes.get("/gradeAtuacao", GradeAtuacaoController.getAll);
gradeAtuacaoRoutes.get("/concluidos",GradeAtuacaoController.getAllEntregues)
gradeAtuacaoRoutes.post('/municipioCompletamento',GradeAtuacaoController.municipioCompletamento)
gradeAtuacaoRoutes.post('/municipioAndamento',GradeAtuacaoController.municipioProjetosPorcentagem)
gradeAtuacaoRoutes.get("/poligonos",GradeAtuacaoController.municipioProjetosPoligonos)
