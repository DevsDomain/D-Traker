import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Pesquisa from '../Pesquisa';

import { gestores, gestoresType } from '../../utils/gestores';
import { useEffect, useState } from 'react';

function noop(): void {
    // do nothing
}
export default function TabelaGestores() {
    const [gestoresList, setGestoresList] = useState<gestoresType[]>(gestores)

    function toggleGestor(gestor: gestoresType) {
        gestor.isActive = !gestor.isActive

    }

    function handlePesquisa(value: string) {
        setGestoresList(gestores.filter(({ name }) => name.toLowerCase().includes(value.toLowerCase())))
    }

    return (
        <Card>
            <Pesquisa placeholder='Pesquisar gestor por nome' handlePesquisa={handlePesquisa} />
            <Box sx={{ overflowX: 'auto' }}>
                <Table sx={{ maxWidth: '800px' }}>
                    <TableHead>
                        <TableRow>

                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Projeto</TableCell>
                            <TableCell>Ativo</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {gestoresList.map((gestor) => {
                            return (
                                <TableRow hover key={gestor.id}>

                                    <TableCell>
                                        <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                                            <Typography variant="subtitle2">{gestor.name}</Typography>
                                        </Stack>
                                    </TableCell>

                                    <TableCell>{gestor.email}</TableCell>
                                    <TableCell>{gestor.projeto}</TableCell>
                                    <TableCell>
                                        <Checkbox
                                            checked={gestor.isActive}
                                            onClick={() => toggleGestor(gestor)}
                                        />
                                    </TableCell>


                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Box>
            <Divider />
            <TablePagination
                component="div"
                count={gestores.length}
                page={0}
                rowsPerPage={5}
                rowsPerPageOptions={[5, 10, 25]}
                onPageChange={noop}
                onRowsPerPageChange={noop}
            />
        </Card>
    );
}