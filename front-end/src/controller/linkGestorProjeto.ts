import { api } from "../services/index"
export const atribuirGestorProjeto = async (idGestor: string, idProjeto: string) => {
    try {
        const response = await api.post("/gestorProjeto", {
            idGestor,
            idProjeto,
        })
        return response;
    } catch (err: any) {
        if (err.response && err.response.data) {
            throw new Error(err.response.data);

        }
        throw new Error("Problemas ao vincular projeto a gestor");

    }

}