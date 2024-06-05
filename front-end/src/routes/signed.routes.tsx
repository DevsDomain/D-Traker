import { Routes, Route, BrowserRouter } from "react-router-dom";
import GestaoDeAcesso from "../pages/gestaoDeAcesso";
import MeusProjetos from "../pages/meusProjetos/MeusProjetos";
import Dashboard from "../pages/Dashboard/index";
import MenuLateral from "../components/menu-lateral/MenuLateral";
import { UserProps } from "../types/gestaoDeAcesso";
import AcessoNegado from "../pages/acessoNegado/acessoNegado";

interface SignedRoutesProps {
  user: UserProps;
  role: string | null;
}

export function SignedRoutes({ user, role }: SignedRoutesProps) {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}
