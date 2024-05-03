import { createContext, useEffect, useState } from "react";
import { ReactNode } from "react";
import { api } from "../services";
import { AuthContextProps, UserProps } from "../types/gestaoDeAcesso";

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState({} as UserProps);

  async function Logar(
    mail: string,
    password: string,
    setLoading: Function
  ): Promise<Response | number> {
    try {
      if (mail !== "" && password !== "") {
        const response = await api.post("/login", {
          mail: mail,
          password: password,
        });
        setLoading(true);
        setUser(response.data.id);
        localStorage.setItem("idUsuario", response.data.id);
        localStorage.setItem("userName", response.data.userName);
        localStorage.setItem("mail", response.data.mail);
        api.defaults.headers.common["Authorization"] = `Bearer ${user}`;

        return response.status;
      } else {
        alert("Preencha todos os campos!");
        return 401;
      }
    } catch (error: any) {
      alert("Email ou senha inválidos");

      return 401;
    }
  }

  function handleLogOut() {
    api.defaults.headers.common["Authorization"] = `Bearer ''}`;
    localStorage.removeItem("user");
    setUser({} as UserProps);
  }

  useEffect(() => {
    const user = localStorage.getItem("user");
    console.log("User:", user);

    if (user) {
      api.defaults.headers.common["Authorization"] = `Bearer${user}`;
      setUser(JSON.parse(user));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ Logar, handleLogOut, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
