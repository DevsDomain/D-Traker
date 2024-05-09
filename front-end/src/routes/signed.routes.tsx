import { Routes, Route, BrowserRouter } from "react-router-dom";
import GestaoDeAcesso from "../pages/gestaoDeAcesso";
import MeusProjetos from "../pages/meusProjetos/MeusProjetos";
import Dashboard from "../pages/Dashboard/index";
import MenuLateral from "../components/menu-lateral/MenuLateral";

export function SignedRoutes() {
  return (
    <BrowserRouter>
      <MenuLateral />
      <Routes>
        <Route path="/" element={<MeusProjetos />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/gestaoDeAcesso" element={<GestaoDeAcesso />} />
        <Route path="/meusProjetos" element={<MeusProjetos />} />
      </Routes>
    </BrowserRouter>
  );
}
