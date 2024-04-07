import { api } from "../services/index"
export const cadastrarGestor = async (nome: string, email: string, password: string) => {
    try {
        const response = await api.post("/admin", {
            name: nome,
            email,
            password
        })

        return response


    } catch (err: any) {
        if (err.response && err.response.data) {
            throw new Error(err.response.data);

        }
        throw new Error("Problemas ao cadastrar Gestor");

    }

}