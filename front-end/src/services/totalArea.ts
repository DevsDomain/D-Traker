import { api } from "."
export const fetchTotalkm = async () => {
    try {
        const response = await api.get("/totalkm")
        return response.data;
    } catch (err: any) {
        throw new Error("Erro ao buscar dados para totalArea", err.message);
    }

}