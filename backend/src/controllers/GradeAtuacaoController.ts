import { Request, Response } from 'express';

import GradeAtuacaoModel from '../models/cruzeiro';
import { Feature } from '../models/cruzeiro';

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

            const { features } = await GradeAtuacaoModel.findOne({}, { features: 1, _id: 0 }) || { features: [] };
            return res.status(201).json(features[0])

        } catch (error: any) {
            return res.status(500).json({ err: error.message });
        }
    }

    public async Admin(req: Request, res: Response): Promise<Response> {
        try {
            const { features } = await GradeAtuacaoModel.findOne    ({}, { features: 1, _id: 0 }) || { features: [] };
            console.log(features)
            const adminData = features.map((feature: Feature) => ({
                "idProjeto": feature._id,
                "idPropriedade": feature.properties.id,
                "papel": feature.properties.atribuicao,
                "status": feature.properties.status

            }));
            console.log(adminData)
            return res.status(201).json(adminData)

        } catch (error: any) {
            return res.status(500).json({ err: error.message });
        }
    }
}

export default new GradeAtuacaoController();
