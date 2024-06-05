import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack, Typography, TextField, Grid } from "@mui/material";
import BasicSelect from "../../components/Select";
import { useMunicipios } from "../../hooks/useMunicipios";

function TabelaMunicipios() {
    const {
        municipios,
        projeto,
        selectedProjeto,
        filteredMunicipios,
        searchTerm,
        handlePesquisaByProjeto,
        handleSearchTermChange
    } = useMunicipios();

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
                        {filteredMunicipios.map((municipio) => (
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
