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
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';


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
        <>
            {gestores.length === 0 ? <CircularProgress style={{ margin: '2% auto', width: 100, height: 100 }} /> : (
                <Card style={{ minWidth: 700 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Projeto</TableCell>
                                <TableCell>Código do municipio</TableCell>
                                <TableCell>UF</TableCell>
                                <TableCell>Gestor</TableCell>
                                <TableCell>E-mail do gestor(a)</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Acesso</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {gestores.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((gestor) => {
                                const { label, color } = statusMap[gestor.status] ?? { label: 'Não atribuído', color: 'default' };

                                return (
                                    <TableRow hover key={gestor.idProjeto}>
                                        <TableCell>{gestor.NomeProjeto}</TableCell>
                                        <TableCell>{gestor['Código Municipio']}</TableCell>
                                        <TableCell>{gestor.UF}</TableCell>
                                        <TableCell>{gestor.GestorNome}</TableCell>
                                        <TableCell>{gestor.GestorEmail}</TableCell>

                                        <TableCell>
                                            <Chip color={color} label={label} size="small" />
                                        </TableCell>
                                        <TableCell>
                                            <Checkbox
                                                checked={gestor.idProjeto ? true : false}

                                            />
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

            )}
        </>

    );
}

export default TabelaGestores;
