import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';

function createData(
    ID: number,
    name: string,
    data: Date,
    percent: number,
) {
    return { ID, name, data, percent };
}

const rows = [
    createData(1, 'Juliana', new Date('2021-09-15'), 6.0),
    createData(2, 'Abner', new Date('2021-09-15'), 9.0),
    createData(3, 'Claudia', new Date('2021-09-15'), 16.0),
    createData(4, 'Michael', new Date('2021-09-15'), 3.7),
    createData(5, 'Fernando', new Date('2021-09-15'), 16.0),
];

export default function TabelaProjetos() {
    return (
        <Stack spacing={3} margin="3% auto" marginLeft="20%">
            <Typography variant="h4">Meus Projetos</Typography>
            <TableContainer component={Paper} sx={{ maxWidth: 1000 }}>
                <Table sx={{ minWidth: 600 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ minWidth: 50 }} align="center">ID</TableCell>
                            <TableCell style={{ minWidth: 100 }} align="center">Nome</TableCell>
                            <TableCell style={{ minWidth: 100 }} align="center">Data</TableCell>
                            <TableCell style={{ minWidth: 150 }} align="center"> % Concluido</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell align="center">{row.ID}</TableCell>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">{row.data.toLocaleDateString()}</TableCell>
                                <TableCell align="center">{row.percent}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    );
}