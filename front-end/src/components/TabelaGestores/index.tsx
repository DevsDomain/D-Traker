import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Chip from '@mui/material/Chip';
import { ResponseAdminApi } from '../../types/gestaoDeAcesso';

function TabelaGestores({ gestores }: { gestores: readonly ResponseAdminApi[] }) {
    const statusMap = {
        finalizado: { label: 'Finalizado', color: 'success' },
        andamento: { label: 'Em andamento', color: 'warning' },

    } as const;

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(50);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Card>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Projeto</TableCell>
                        <TableCell>Gestor</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {gestores.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((gestor) => {
                        const { label, color } = statusMap[gestor.status] ?? { label: 'Não atribuído', color: 'default' };

                        return (
                            <TableRow hover key={gestor.idProjeto}>
                                <TableCell>{gestor.NomeProjeto}</TableCell>
                                <TableCell>{gestor.GestorNome}</TableCell>
                                <TableCell>
                                    <Chip color={color} label={label} size="small" />
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            <Divider />
            <TablePagination
                component="div"
                count={gestores.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[50, 75, 100]}
            />
        </Card>
    );
}

export default TabelaGestores;
