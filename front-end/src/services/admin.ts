import { api } from "."
export const fetchAdmin = async () => {
    try {
        const response = await api.get("/admin")
        return response.data;
    } catch (err: any) {
        throw new Error("Erro ao buscar dados para admin", err.message);
    }

}