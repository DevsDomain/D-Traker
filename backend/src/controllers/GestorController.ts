import { Request, Response } from 'express';
import gestorModel, { Gestor } from '../models/gestoresModel';
import GradeAtuacaoModel from '../models/gradeAtuacao';
import MunicipioModel from '../models/municipiosModel';

class GestorController {

    async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const gestores = await gestorModel.find({});
            const responseGestor = gestores.map((gestor: Gestor) => ({
                nomeGestor: gestor.name,
                emailGestor: gestor.email,
                idGestor: gestor.idGestor
            }))
            return res.status(201).json(responseGestor);
        } catch (error: any) {
            return res.status(500).json({ err: error.message });
        }
    }

    async findGestor(req: Request, res: Response): Promise<Response> {
        try {
            const { idGestor } = req.body;
            const gestor = await gestorModel.findOne({ idGestor });

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

            const ultimoID = await gestorModel.findOne({}).sort({ idGestor: -1 }).limit(1)

            let idGestor:number = 1;

            if (ultimoID) {
                idGestor = ultimoID.idGestor + 1;
            }

            console.log("ULTIMO ID", ultimoID, "ID", idGestor)
            const gestor = new gestorModel({ idGestor, name, email, password });
            const response = await gestor.save()

            return res.status(201).json(response);

        } catch (error: any) {
            return res.status(500).json(error.message);
        }
    }

    async vincularProjeto(req: Request, res: Response): Promise<Response> {
        try {
            const { idGestor, idProjeto } = req.body;
            const gestor = await gestorModel.findOne({idGestor:idGestor});
        
            const projeto = await MunicipioModel.findOne({id:idProjeto});

            if (!gestor) {
                return res.status(400).json("Gestor não encontrado!");
            }

            if (!projeto) {
                return res.status(400).json("Projeto não encontrado!");

            }

            const projectLinkedToGestor = await MunicipioModel.updateOne({ id: idProjeto }, { $set: { idgestor:gestor.idGestor} });
            console.log("Update result:", projectLinkedToGestor);


            if (projectLinkedToGestor.modifiedCount === 0) {
                return res.status(404).json("Projeto não atualizado!");

            }

            return res.status(201).json("Projeto atualizado com sucesso!");
        } catch (error: any) {

            return res.status(500).json(error.message);
        }
    }

}


export default new GestorController();