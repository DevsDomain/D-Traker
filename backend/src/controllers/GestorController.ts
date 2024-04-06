import { Request, Response } from 'express';
import gestorModel from '../models/gestores';

class GestorController {

    async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const gestores = await gestorModel.find({});
            return res.status(201).json(gestores);
        } catch (error: any) {
            return res.status(500).json({ err: error.message });
        }
    }

    async findGestor(req: Request, res: Response): Promise<Response> {
        try {
            const { email } = req.body;
            const gestor = await gestorModel.findOne({ email });

            if (!gestor) {
                return res.status(400).json("Gestor não encontrado!");
            }
            return res.status(201).json(gestor._id);
        } catch (error: any) {
            return res.status(500).json({ err: error.message })
        }
    }


    async create(req: Request, res: Response): Promise<Response> {
        try {

            const { name, email, password } = req.body;

            // VERIFICA SE O EMAIL JÁ ESTA CADASTRADO
            const userExists = await gestorModel.findOne({ email })
            if (userExists) {
                return res.status(400).json("Usuário já cadastrado!")
            }

            const gestor = new gestorModel({ name, email, password });
            const response = await gestor.save()

            return res.status(201).json(response._id);

        } catch (error: any) {
            return res.status(500).json({ err: error.message });
        }
    }
}


export default new GestorController();