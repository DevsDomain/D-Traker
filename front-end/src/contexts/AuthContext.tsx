import { createContext, useEffect, useState } from "react";
import { ReactNode } from "react";
import { api } from "../services";
import { AuthContextProps, UserProps } from "../types/gestaoDeAcesso";

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState({} as UserProps);
  const [role, setRole] = useState<string | null>(null);

  function handleLogOut() {
    api.defaults.headers.common["Authorization"] = `Bearer ''}`;
    localStorage.removeItem("user");
    setUser({} as UserProps);
  }

  useEffect(() => {
    const user = localStorage.getItem("user");
    console.log("User:", user);
    const role = localStorage.getItem("role");
    console.log("Role:", role);

    if (user && role) {
      api.defaults.headers.common["Authorization"] = `Bearer${user}`;
      setUser(JSON.parse(user));
      setRole(role);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ handleLogOut, user, setUser, role, setRole }}
    >
      {children}
    </AuthContext.Provider>
  );
}
