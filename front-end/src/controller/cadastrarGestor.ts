import { api } from "../services/index"
export const cadastrarGestor = async (nome: string, email: string, password: string,role:string) => {
    console.log("CADASTRO DE GESTOR FRONT-END",role)
    try {
        const response = await api.post("/gestor", {
            name: nome,
            email,
            password,
            role
        })

        return response


    } catch (err: any) {
        if (err.response && err.response.data) {
            throw new Error(err.response.data);

        }
        throw new Error("Problemas ao cadastrar Gestor");

    }

}