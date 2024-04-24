import { Routes, Route } from "react-router-dom";
import GestaoDeAcesso from "../pages/gestaoDeAcesso";
import MenuLateral from "../pages/menu-lateral/MenuLateral";
import MeusProjetos from "../pages/meusProjetos/MeusProjetos";
import Dashboard from "../pages/Dashboard/Dashboard";


export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/gestaoDeAcesso" element={<GestaoDeAcesso/>}/>
            <Route path="/menuLateral" element={<MenuLateral />} />
            <Route path="/meusProjetos" element={<MeusProjetos />} />
        </Routes>
    )
}