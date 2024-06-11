import { Routes, Route } from "react-router-dom";
import GestaoDeAcesso from "../pages/gestaoDeAcesso";
import MeusProjetos from "../pages/meusProjetos/MeusProjetos";
import Dashboard from "../pages/Dashboard/index";
import MenuLateral from "../components/menu-lateral/MenuLateral";
import AcessoNegado from "../pages/acessoNegado/acessoNegado";
import useAuth from "../hooks/auth";

export function SignedRoutes() {
  const { role } = useAuth();
  return (
    <>
      <MenuLateral />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {role === "adm" ? (
          <Route path="/gestaoDeAcesso" element={<GestaoDeAcesso />} />
        ) : (
          <Route path="/gestaoDeAcesso" element={<AcessoNegado />} />
        )}

        <Route path="/meusProjetos" element={<MeusProjetos />} />
      </Routes>
    </>
  );
}
