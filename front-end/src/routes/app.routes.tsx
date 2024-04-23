import { Routes, Route } from "react-router-dom";
import App from "../App";
import GestaoDeAcesso from "../pages/gestaoDeAcesso";
import MenuLateral from "../pages/menu-lateral/MenuLateral";
import MeusProjetos from "../pages/meusProjetos/MeusProjetos";
import Login  from "../pages/login";


export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/gestaoDeAcesso" element={<GestaoDeAcesso/>}/>
            <Route path="/menuLateral" element={<MenuLateral />} />
            <Route path="/meusProjetos" element={<MeusProjetos />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}