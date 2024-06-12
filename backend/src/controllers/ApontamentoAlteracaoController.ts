import { Request, Response } from 'express';
import ApontamentoAlteracaoModel, { ApontamentoAlteracaoType } from '../models/apontamentoAlteracao';

class ApontamentoAlteracao {
    public async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const alteracoes = await ApontamentoAlteracaoModel.find({});
            return res.status(201).json(alteracoes)

        } catch (error: any) {
            return res.status(500).json({ err: error.message });
        }
    }






}

export default new ApontamentoAlteracao();
