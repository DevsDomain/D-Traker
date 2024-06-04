import { useState, useEffect } from "react";
import { fetchMunicipios } from "../services/projetos";
import { MunicipioProps } from "../types/meusProjetos";
import { fetchAdmin } from '../services/admin';
import { ResponseAdminApi } from '../types/gestaoDeAcesso';

export const useMunicipios = () => {
    const [municipios, setMunicipios] = useState<MunicipioProps[]>([]);
    const [projeto, setProjeto] = useState<{ key: string; value: string }[]>([]);
    const [selectedProjeto, setSelectedProjeto] = useState<string>("");
    const [filteredMunicipios, setFilteredMunicipios] = useState<MunicipioProps[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    function handlePesquisaByProjeto(value: string) {
        setSelectedProjeto(value);
        if (value === "") {
            setFilteredMunicipios(municipios);
        } else {
            const filtered = municipios.filter(({ id }) => id === value);
            setFilteredMunicipios(filtered);
        }
    }

    function handleSearchTermChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchTerm(event.target.value);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const projetos = await fetchAdmin();
                const projetosUnicos: { key: string; value: string }[] = projetos.map((projeto: ResponseAdminApi) => ({
                    key: projeto.idProjeto,
                    value: projeto.NomeProjeto
                }));
                setProjeto(projetosUnicos);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchMunicipiosData = async () => {
            try {
                const data = await fetchMunicipios();
                setMunicipios(data);
                setFilteredMunicipios(data);
            } catch (error) {
                console.error("Erro ao buscar os municípios:", error);
            }
        };
        fetchMunicipiosData();
    }, []);

    useEffect(() => {
        const filtered = municipios.filter(municipio =>
            municipio.nm_mun.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedProjeto === "" || municipio.id === selectedProjeto)
        );
        setFilteredMunicipios(filtered);
    }, [searchTerm, selectedProjeto, municipios]);

    return {
        municipios,
        projeto,
        selectedProjeto,
        filteredMunicipios,
        searchTerm,
        handlePesquisaByProjeto,
        handleSearchTermChange
    };
};
