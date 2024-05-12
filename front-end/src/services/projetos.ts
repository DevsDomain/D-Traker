import { api } from "."
export const fetchMunicipios = async () => {
    try {
        const response = await api.get("/municipios")
        return response.data;
    } catch (err: any) {
        throw new Error("Erro ao buscar dados para municipios", err.message);
    }

}