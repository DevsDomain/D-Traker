import { api } from "."
export const fetchGestores = async () => {
    try {
        const response = await api.get("/gestores")
        return response.data;
    } catch (err: any) {
        throw new Error("Erro ao buscar dados de gestores", err.message);
    }

}