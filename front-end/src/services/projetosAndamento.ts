import { api } from "../services/index"
export const FetchProjetoStatus = async (idProjeto: string) => {
    try {
        const response = await api.post("/municipioAndamento", {
            idProjeto
        })

        return response.data


    } catch (err: any) {
        if (err.response && err.response.data) {
            throw new Error(err.response.data);

        }
        throw new Error("Problemas ao buscar status do projeto ");

    }

}