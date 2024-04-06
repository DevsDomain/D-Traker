import { Request, Response } from 'express';

import GradeAtuacaoModel, { GradeAtuacao} from '../models/cruzeiro';

class GradeAtuacaoController {
    public async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const { features } = await GradeAtuacaoModel.findOne({}, { features: 1, _id: 0 }) || { features: [] };
            return res.status(201).json(features)

        } catch (error: any) {
            return res.status(500).json({ err: error.message });
        }
    }

    public async getUnique(req: Request, res: Response): Promise<Response> {
        try {

            const features = await GradeAtuacaoModel.findOne({}, { features: 3, _id: 0 }) || { features: [] };
            return res.status(201).json(features)

        } catch (error: any) {
            return res.status(500).json({ err: error.message });
        }
    }

    public async Admin(req: Request, res: Response): Promise<Response> {
        try {
            const projetos = await GradeAtuacaoModel.find({});
            const adminData = projetos.map((projeto: GradeAtuacao) => ({
                "NomeProjeto": projeto.name,
                "idProjeto": projeto._id,
                "GestorNome":projeto.gestor.name,
                "GestorId": projeto.gestor._id,
                "status" : "andamento"

            }))
            return res.status(201).json(adminData)

        } catch (error: any) {
            return res.status(500).json({ err: error.message });
        }
    }
}

export default new GradeAtuacaoController();
