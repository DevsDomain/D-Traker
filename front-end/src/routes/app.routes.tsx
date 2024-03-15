import { Routes, Route } from "react-router-dom";
import App from "../App";
import GestaoDeAcesso from "../pages/gestaoDeAcesso";

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/gestaoDeAcesso" element={<GestaoDeAcesso/>}/>
        </Routes>
    )
}