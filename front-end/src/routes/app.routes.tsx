import { Routes, Route } from "react-router-dom";
import App from "../App";
import GraficoBarra from "../components/graficos/GraficoBarra";
import GraficoPizza from "../components/graficos/GraficoPizza";
import GestaoDeAcesso from "../pages/gestaoDeAcesso";
import MeusProjetos from "../pages/meusProjetos/MeusProjetos";

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/gestaoDeAcesso" element={<GestaoDeAcesso />} />
            <Route path="/meusProjetos" element={<MeusProjetos />} />
            <Route path="/graficoBarra" element={<GraficoBarra />} />
            <Route path="/graficoPizza" element={<GraficoPizza />} />
        </Routes >
    );
}