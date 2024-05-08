import { api } from "../services/index"
export const porcentagemProjeto = async (idProjeto: string) => {
    try {
        const response = await api.post("/municipioCompletamento", {
            idProjeto,
        })
        return response;
    } catch (err: any) {
        if (err.response && err.response.data) {
            throw new Error(err.response.data);

        }
        throw new Error("Problemas ao buscar completamento do projeto");

    }

}