import { api } from "../services/index"
export const cadastrarGestor = async (nome: string, email: string, password: string) => {
    try {
        const response = await api.post("/admin", {
            name: nome,
            email,
            password
        })
        return response;
    } catch (err: any) {
        throw new Error("Erro ao cadastrar gestor", err.message);
    }

}