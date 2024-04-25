import { Routes, Route } from "react-router-dom";
import GestaoDeAcesso from "../pages/gestaoDeAcesso";
import MeusProjetos from "../pages/meusProjetos/MeusProjetos";
import Dashboard from "../pages/Dashboard/index";
import Login  from "../pages/login";


export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/gestaoDeAcesso" element={<GestaoDeAcesso />} />
            <Route path="/meusProjetos" element={<MeusProjetos />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}