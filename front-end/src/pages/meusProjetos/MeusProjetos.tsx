import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { fetchMunicipios } from "../../services/projetos";
import { MunicipioProps } from "../../types/meusProjetos";
import BasicSelect from "../../components/Select";
import { fetchAdmin } from '../../services/admin'
import { ResponseAdminApi } from '../../types/gestaoDeAcesso';
import { porcentagemProjeto } from "../../controller/porcentagemProjeto";

function TabelaMunicipios() {
    const [municipios, setMunicipios] = useState<MunicipioProps[]>([]);
    const [projeto, setProjeto] = useState<{ key: string; value: string }[]>([]);
    const [selectedProjeto, setSelectedProjeto] = useState<string>("");
    const [filteredMunicipios, setFilteredMunicipios] = useState<MunicipioProps[]>([]);

    function handlePesquisaByProjeto(value: string) {
        setSelectedProjeto(value);
        if (value === "") {
            setFilteredMunicipios(municipios);
        } else {
            const filtered = municipios.filter(({ id }) => id === value);
            setFilteredMunicipios(filtered);
        }
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

    return (
        <Stack spacing={3} margin="3% auto" marginLeft="20%">
            <Stack spacing={3}>
                <BasicSelect
                    handlePesquisaByProjeto={handlePesquisaByProjeto}
                    projeto={projeto}
                    placeHolder="Projeto"
                />
            </Stack>
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
