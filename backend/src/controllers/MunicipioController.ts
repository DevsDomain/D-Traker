import { Request, Response } from 'express';
import MunicipioModel,{Municipio} from '../models/municipiosModel';
import gestorModel,{Gestor} from '../models/gestoresModel';

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
                    const gestor = await gestorModel.findOne({idGestor:projeto.idgestor});
    
                    return {
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


  
}

export default new MunicipioController();
