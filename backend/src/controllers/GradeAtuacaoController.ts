import { Request, Response } from 'express';
import ApontamentoAlteracaoModel, { ApontamentoAlteracaoType } from '../models/apontamentoAlteracao';
import GradeAtuacaoModel, { GradeAtuacao } from '../models/gradeAtuacao';
import MunicipioModel from '../models/municipiosModel'

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
            const { idProjeto } = req.body;
            const projetos = await GradeAtuacaoModel.countDocuments({ idprojeto: idProjeto });
            const concluidos = await GradeAtuacaoModel.countDocuments({ idprojeto: idProjeto, status: 'finalizado' });

            let resultado = (concluidos / projetos) * 100;

            return res.status(201).json(resultado)

        } catch (error: any) {
            return res.status(500).json({ err: error.message });
        }
    }

    public async getAllEntregues(req: Request, res: Response): Promise<Response> {
        try {
            const projetos = await GradeAtuacaoModel.find({ status: 'finalizado' });

            const ProjetosRetrabalhados = await Promise.all(projetos.map(async (projeto: GradeAtuacao) => {
                const retrabalhos: ApontamentoAlteracaoType = await ApontamentoAlteracaoModel.findOne({ idatividade: projeto.id }) as ApontamentoAlteracaoType

                // CASO NÃO TENHA GERADO RETRABALHO
                if (!retrabalhos) {
                    return {
                        "idMunicipio": projeto.idprojeto,
                        "idProjeto": projeto.id,
                        "idAlteracao": null,
                        "data_entregue_atuacao": projeto.data_entrega,
                        "data_ordem_retrabalho": null,
                        "idanalista": projeto.idanalista,
                        "idRevisor": null
                    };
                }
                // EM CASO DE RETRABALHO
                return {
                    "idMunicipio": projeto.idprojeto,
                    "idProjeto": projeto.id,
                    "idAlteracao": retrabalhos.id,
                    "data_entregue_atuacao": projeto.data_entrega,
                    "data_ordem_retrabalho": retrabalhos.data_ordem,
                    "idanalista": projeto.idanalista,
                    "idRevisor": retrabalhos.idrevisor

                };
            }))
            return res.status(201).json(ProjetosRetrabalhados)

        } catch (error: any) {
            return res.status(500).json({ err: error.message });
        }
    }

    public async municipioProjetosPorcentagem(req: Request, res: Response): Promise<Response> {
        try {
            const { idProjeto } = req.body;
            const filtro = idProjeto ? { idprojeto: idProjeto } : {};


            const [desenvolvimento, concluidos, naoAtribuido] = await Promise.all([
                GradeAtuacaoModel.countDocuments({ ...filtro, status: 'andamento' }),
                GradeAtuacaoModel.countDocuments({ ...filtro, status: 'finalizado' }),
                GradeAtuacaoModel.countDocuments({ ...filtro, status: "NULL" }),
            ]);


            const andamentoProjetos = {
                "andamento": desenvolvimento.toFixed(2),
                "concluidos": concluidos.toFixed(2),
                "naoAtribuido": naoAtribuido.toFixed(2)
            }



            return res.status(201).json(andamentoProjetos)

        } catch (error: any) {
            return res.status(500).json({ err: error.message });
        }
    }

    public async municipioProjetosPoligonos(_: Request, res: Response): Promise<Response> {
        try {
            let poligonos: andamentoProjetos[] = []

            type andamentoProjetos = {
                "projeto": string,
                "nomeProjeto": string,
                "andamento": string,
                "concluidos": string,
                "naoAtribuido": string
            }

            for (let i = 1; i < 4; i++) {
                console.log(i)

                const projeto = await GradeAtuacaoModel.findOne({ idprojeto: i });
                console.log(projeto)
                if (!projeto) continue;
    
                const nomeProjeto = await MunicipioModel.findOne({ id: projeto.idprojeto });
                if (!nomeProjeto) continue;
    
                const [desenvolvimento, concluidos, naoAtribuido] = await Promise.all([
                    GradeAtuacaoModel.countDocuments({ idprojeto: i, status: 'andamento' }),
                    GradeAtuacaoModel.countDocuments({ idprojeto: i, status: 'finalizado' }),
                    GradeAtuacaoModel.countDocuments({ idprojeto: i, status: "NULL" }),
                ]);
    
                poligonos.push({
                    "projeto": projeto.idprojeto.toString(),
                    "nomeProjeto": nomeProjeto.nm_mun.toString(),
                    "andamento": desenvolvimento.toString(),
                    "concluidos": concluidos.toString(),
                    "naoAtribuido": naoAtribuido.toString()
                });
            }


            return res.status(201).json(poligonos)



        } catch (error: any) {
            return res.status(500).json({ err: error.message });
        }
    }

}

export default new GradeAtuacaoController();
