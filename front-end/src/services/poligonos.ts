import { api } from "."
export const fetchPoligonos = async () => {
    try {
        const response = await api.get("/poligonos")
        return response.data;
    } catch (err: any) {
        throw new Error("Erro ao buscar dados para poligonos", err.message);
    }

}