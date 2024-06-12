import { api } from "."
export const fetchAlteracoes = async () => {
    try {
        const response = await api.get("/concluidos")
        return response.data;
    } catch (err: any) {
        throw new Error("Erro ao buscar dados de alterações e apontamentos", err.message);
    }

}