import React from 'react';
import { Routes, Route } from "react-router-dom";
import App from "../App";
import GestaoDeAcesso from "../pages/gestaoDeAcesso";
import MeusProjetos from "../pages/meusProjetos/MeusProjetos";

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/gestaoDeAcesso" element={<GestaoDeAcesso />} />
            <Route path="/meusProjetos" element={<MeusProjetos />} />
        </Routes >
    );
}