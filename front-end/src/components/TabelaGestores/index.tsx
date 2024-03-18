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
import Chip from '@mui/material/Chip';




import { gestoresType } from '../../utils/gestores';
import { setDefaultResultOrder } from 'dns';

function noop(): void {
    // do nothing
}

interface TabelaGestoresProps {
    gestores: readonly gestoresType[];
}

export default function TabelaGestores({ gestores }: TabelaGestoresProps) {
    const statusMap = {
        Suspended: { label: 'Suspended', color: 'warning' },
        Active: { label: 'Active', color: 'success' },
        Closed: { label: 'Closed', color: 'error' },
    } as const;


    return (
        <Card>

            <Box sx={{ overflowX: 'auto' }}>
                <Table sx={{ maxWidth: '800px' }}>
                    <TableHead>
                        <TableRow>

                            <TableCell>Nome</TableCell>
                            <TableCell>Projeto</TableCell>
                            <TableCell>Papel</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Conceder Acesso Total</TableCell>


                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {gestores.map((gestor: gestoresType) => {
                            const { label, color } = statusMap[gestor.status] ?? {
                                label: 'Unknown',
                                color: 'default'
                            };

                            return (
                                <TableRow hover key={gestor.id}>

                                    <TableCell>
                                        <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                                            <Typography variant="subtitle2">{gestor.name}</Typography>
                                        </Stack>
                                    </TableCell>

                                    <TableCell>{gestor.projeto}</TableCell>
                                    <TableCell>{gestor.papel}</TableCell>

                                        <TableCell>
                                            <Chip color={color} label={label} size="small" />
                                        </TableCell>

                                        <TableCell>
                                        <Checkbox
                                            checked={gestor.isActive}

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