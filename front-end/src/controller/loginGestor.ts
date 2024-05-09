import { api } from "../services/index";

export const loginGestor = async (email: string, password: string) => {
  try {
    const response = await api.post("/login", {
      email,
      password,
    });
    console.log("Resposta do servidor:", response.data);
    return response;
  } catch (err: any) {
    if (err.response && err.response.data) {
      throw new Error(err.response.data);
    }
    throw new Error("Problemas ao logar Gestor");
  }
};
