import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack, Typography, TextField, Grid } from "@mui/material";
import { fetchMunicipios } from "../../services/projetos";
import { MunicipioProps } from "../../types/meusProjetos";
import BasicSelect from "../../components/Select";
import { fetchAdmin } from '../../services/admin';
import { ResponseAdminApi } from '../../types/gestaoDeAcesso';

function TabelaMunicipios() {
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

    //Inserido para filtrar os municípios pelo nome na caixa de Matchcode → TextField
    useEffect(() => {
        const filtered = municipios.filter(municipio =>
            municipio.nm_mun.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedProjeto === "" || municipio.id === selectedProjeto)
        );
        setFilteredMunicipios(filtered);
    }, [searchTerm, selectedProjeto, municipios]);

    return (
        <Stack spacing={3} margin="3% auto" marginLeft="20%">
            <Grid container spacing={3} alignItems="center">
                <Grid item xs={6}>
                    <BasicSelect
                        onChange={handlePesquisaByProjeto}
                        value={selectedProjeto}
                        handlePesquisaByProjeto={handlePesquisaByProjeto}
                        projeto={projeto}
                        sx={{ flex: 1 }}
                        placeHolder='Selecione o Projeto'
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Pesquise por projeto"
                        variant="outlined"
                        value={searchTerm}
                        onChange={handleSearchTermChange}
                        sx={{ flex: 1 }} />
                </Grid>
            </Grid>
            <Typography variant="h4">Municípios</Typography>
            <TableContainer component={Paper} sx={{ maxWidth: 1000 }}>
                <Table sx={{ minWidth: 600 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>Código IBGE</TableCell>
                            <TableCell>UF</TableCell>
                            <TableCell>%</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredMunicipios.map((municipio: MunicipioProps) => (
                            <TableRow key={municipio.id}>
                                <TableCell>{municipio.id}</TableCell>
                                <TableCell>{municipio.nm_mun}</TableCell>
                                <TableCell>{municipio.cd_mun}</TableCell>
                                <TableCell>{municipio.sigla_uf}</TableCell>
                                <TableCell>{municipio.completamento}%</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    );
}

export default TabelaMunicipios;
