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
            <Typography variant="h2" sx={{ fontFamily: 'Calibri', fontWeight: 'bold', fontSize: '20px' }}>Meus Projetos</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell padding='none' style={{ padding: '15px 5px' }} align="right">ID</TableCell>
                            <TableCell padding='none' style={{ padding: '15px 5px' }} align="right">Nome</TableCell>
                            <TableCell padding='none' style={{ padding: '15px 5px' }} align="right">Data</TableCell>
                            <TableCell padding='none' style={{ padding: '15px 5px' }} align="right">% Concluido</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell padding='none' style={{ padding: '15px 5px' }} align="right"> {row.ID} </TableCell>
                                <TableCell padding='none' style={{ padding: '15px 5px' }} align="right">{row.name}</TableCell>
                                <TableCell padding='none' style={{ padding: '15px 5px' }} align="right">{row.data.toLocaleDateString()}</TableCell>
                                <TableCell padding='none' style={{ padding: '15px 5px' }} align="right">{row.percent}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    );
}
