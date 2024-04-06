import { Request, Response } from 'express';
import gestorModel, { Gestor } from '../models/gestores';
import GradeAtuacaoModel from '../models/cruzeiro';

class GestorController {

    async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const gestores = await gestorModel.find({});
            const responseGestor = gestores.map((gestor: Gestor) => ({
                idGestor: gestor._id,
                nomeGestor: gestor.name
            }))
            return res.status(201).json(responseGestor);
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

    async vincularProjeto(req: Request, res: Response): Promise<Response> {
        try {
            const { idGestor, idProjeto } = req.body;
            const gestor = await gestorModel.findById(idGestor);

            if (!gestor) {
                return res.status(404).json({ err: "Gestor não encontrado!" });
            }

            const projectLinkedToGestor = await GradeAtuacaoModel.updateOne({ _id: idProjeto }, { $set: { gestor: gestor } });
            console.log("Update result:", projectLinkedToGestor);


            if (projectLinkedToGestor.modifiedCount === 0) {
                return res.status(404).json({ err: "Projeto não atualizado!" });

            }

            return res.status(201).json("Projeto atualizado com sucesso!");
        } catch (error: any) {

            return res.status(500).json({ err: error.message });
        }
    }

    async MichaelGambiarra(): Promise<void> {
        try {
            const filter = {};
            const update = {
                $set: {
                    gestor: null
                }
            };

            // Update all documents in the collection
            const result = await GradeAtuacaoModel.updateMany(filter, update);

            // Log the result
            console.log(`${result.modifiedCount} documents atualizados.`);
        } catch (error: any) {
            console.error("ERROR", error.message);
        }
    }

}


export default new GestorController();