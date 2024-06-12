import { createContext, useEffect, useState } from "react";
import { ReactNode } from "react";
import { api } from "../services";
import { AuthContextProps, UserProps } from "../types/gestaoDeAcesso";

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState({} as UserProps);
  const [role, setRole] = useState({} as string);
  const [token, setToken] = useState({} as string);

  function handleLogOut() {
    api.defaults.headers.common["Authorization"] = `Bearer ''}`;
    localStorage.removeItem("user");
    setUser({} as UserProps);
  }

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && role && token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(JSON.parse(user));
      setRole(JSON.parse(user).role);
      setToken(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{ handleLogOut, user, setUser, role, setRole, token, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}
