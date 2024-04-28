import { Request, Response } from 'express';
import MunicipioModel, { Municipio } from '../models/municipiosModel';
import gestorModel, { Gestor } from '../models/gestoresModel';

class MunicipioController {
    public async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const municipios = await MunicipioModel.find({});


            return res.status(201).json(municipios)

        } catch (error: any) {
            return res.status(500).json({ err: error.message });
        }
    }


    public async Admin(req: Request, res: Response): Promise<Response> {
        try {
            const projetos = await MunicipioModel.find({});
            const adminData = await Promise.all(projetos.map(async (projeto: Municipio) => {
                const gestor = await gestorModel.findOne({ idGestor: projeto.idgestor });

                return {
                    "idProjeto": projeto.id,
                    "NomeProjeto": projeto.nm_mun,
                    "Código Municipio": projeto.cd_mun,
                    "UF": projeto.sigla_uf,
                    "GestorNome": gestor?.name,
                    "GestorEmail": gestor?.email,
                    "status": "andamento"

                };
            }))

            return res.status(201).json(adminData)

        } catch (error: any) {
            return res.status(500).json({ err: error.message });
        }
    }


    async vincularProjeto(req: Request, res: Response): Promise<Response> {
        try {
            const { idGestor, idProjeto } = req.body;
            console.log("idGestor",idGestor)
            const gestor = await gestorModel.findOne({ idGestor: idGestor });
            console.log(gestor)

            const projeto = await MunicipioModel.findOne({ id: idProjeto });

            if (!gestor) {
                return res.status(400).json("Gestor não encontrado!");
            }

            if (!projeto) {
                return res.status(400).json("Projeto não encontrado!");

            }

            const projectLinkedToGestor = await MunicipioModel.updateOne({ id: idProjeto }, { $set: { idgestor: gestor.idGestor } });
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

export default new MunicipioController();
