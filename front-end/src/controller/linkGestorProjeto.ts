import { api } from "../services/index"
export const atribuirGestorProjeto = async (idGestor: string, idProjeto: string) => {
    try {
        const response = await api.post("/gestorProjeto", {
            idGestor,
            idProjeto,
        })
        return response;
    } catch (err: any) {
        throw new Error("Erro ao vincular gestor a projeto", err.message);
    }

}