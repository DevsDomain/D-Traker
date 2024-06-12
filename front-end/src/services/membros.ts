import { api } from "."
export const fetchMembros = async () => {
    try {
        const response = await api.get("/usuarios")
        return response.data;
    } catch (err: any) {
        throw new Error("Erro ao buscar usuarios", err.message);
    }

}