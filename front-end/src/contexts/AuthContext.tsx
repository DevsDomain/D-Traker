import { createContext, useEffect, useState } from "react";
import { ReactNode } from "react";
import { api } from "../services";
import { AuthContextProps, UserProps } from "../types/gestaoDeAcesso";

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState({} as UserProps);
  /*
  async function Logar(
    email: string,
    password: string,
    setLoading: Function
  ): Promise<Response | number> {
    try {
      if (email !== "" && password !== "") {
        const response = await api.post("/login", {
          email: email,
          password: password,
        });
        setLoading(true);
        setUser(response.data.id);
        localStorage.setItem("user", JSON.stringify(response.data));

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
  }*/

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
    <AuthContext.Provider value={{ handleLogOut, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}