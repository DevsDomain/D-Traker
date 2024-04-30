import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { fetchMunicipios } from '../../services/projetos';
import { MunicipioProps } from '../../types/meusProjetos';




function TabelaMunicipios() {
    const [municipios, setMunicipios] = useState([]);

    useEffect(() => {
        const fetchMunicipiosData = async () => {
            try {
                const data = await fetchMunicipios();
                setMunicipios(data);
            } catch (error) {
                console.error('Erro ao buscar os municípios:', error);
            }
        };

        fetchMunicipiosData();
    }, []);

    return (
        <Stack spacing={3} margin="3% auto" marginLeft="20%">
            <Typography variant="h4">Municípios</Typography>
            <TableContainer component={Paper} sx={{ maxWidth: 1000 }}>
                <Table sx={{ minWidth: 600 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>Código</TableCell>
                            <TableCell>UF</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {municipios.map((municipio: MunicipioProps) => (
                            <TableRow key={municipio._id}>
                                <TableCell>{municipio._id}</TableCell>
                                <TableCell>{municipio.nm_mun}</TableCell>
                                <TableCell>{municipio.cd_mun}</TableCell>
                                <TableCell>{municipio.sigla_uf}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    );
}

export default TabelaMunicipios;