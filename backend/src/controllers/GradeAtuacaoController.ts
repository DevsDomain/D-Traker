import { Request, Response } from 'express';

import GradeAtuacaoModel, { GradeAtuacao } from '../models/gradeAtuacao';

class GradeAtuacaoController {
    public async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const gradeAtuacao = await GradeAtuacaoModel.find({});

            const atuação = gradeAtuacao.map((grade: GradeAtuacao) => ({
                idAtuacao: grade.id,
                idAnalista: grade.idanalista,
                atribuicao: grade.atribuicao,
                status: grade.status,
                area_km2: grade.area_km2,
                dataInicial: grade.data_inicial,
                dataEntrega: grade.data_entrega,
                idProjeto: grade.idprojeto
            }))
            return res.status(201).json(atuação)

        } catch (error: any) {
            return res.status(500).json({ err: error.message });
        }
    }

    public async getUnique(req: Request, res: Response): Promise<Response> {
        try {

            const features = await GradeAtuacaoModel.findOne({});
            return res.status(201).json(features)

        } catch (error: any) {
            return res.status(500).json({ err: error.message });
        }
    }
    public async municipioCompletamento(req: Request, res: Response): Promise<Response> {
        try {
            const {idProjeto} = req.body;
            const projetos = await GradeAtuacaoModel.countDocuments({idprojeto:idProjeto});
            const concluidos = await GradeAtuacaoModel.countDocuments({idprojeto:idProjeto, status:'finalizado'});

            console.log("Projetos",projetos)
            console.log("CONCLUIDOS",concluidos)
           
            let resultado = (concluidos / projetos) * 100; 

            return res.status(201).json(resultado)

        } catch (error: any) {
            return res.status(500).json({ err: error.message });
        }
    }
}

export default new GradeAtuacaoController();
