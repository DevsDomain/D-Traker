import React from 'react';
import { Box, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ReferenceDateDefaultBehavior from '../../components/SeletorData';
import GraficoBarra from '../../components/graficos/GraficoBarra';
import GraficoPizza from '../../components/graficos/GraficoPizza';
import Search from '../../components/Search';
import SimpleLineChart from '../../components/graficos/GraficoLinha';
import { Budget } from '../../components/Box/Box';
import { TotalCustomers } from '../../components/Box/total-customers';
import { TasksProgress } from '../../components/Box/tasks-progress';
// Import other components if needed

const Dashboard: React.FC = () => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            <Box
                height="20vh"
                marginLeft={smDown ? 0 : theme.spacing(35)}
                marginTop={theme.spacing(4)} // Adicionando margem acima
                paddingLeft={smDown ? theme.spacing(2) : theme.spacing(4)} // Adicionando margem à esquerda responsiva
            >
                <ReferenceDateDefaultBehavior/>
            </Box>

            <Grid container spacing={3} marginLeft={smDown ? 0 : theme.spacing(30)} marginTop={smDown ? 0 : theme.spacing(0)}>
                <Grid item lg={3} sm={6} xs={12}>
                    <Budget diff={12} trend="up" sx={{ height: '100%' }} value="$24k" />
                </Grid>
                <Grid item lg={3} sm={6} xs={12}>
                    <TotalCustomers diff={16} trend="down" sx={{ height: '100%' }} value="1.6k" />
                </Grid>
                <Grid item lg={3} sm={6} xs={12}>
                    <TasksProgress sx={{ height: '100%' }} value={75.5} />
                </Grid>
                {/* Add imports and grid item for TotalProfit if needed */}
            </Grid>

            <Grid container spacing={2} marginLeft={smDown ? 0 : theme.spacing(30)} marginTop={smDown ? 0 : theme.spacing(5)}>
                <Grid item xs={12} sm={3}>
                    <GraficoBarra/>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <GraficoPizza/>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <GraficoPizza/>
                </Grid>
                <Grid item xs={12} sm={6} marginLeft={smDown ? 0 : theme.spacing(5)} marginTop={smDown ? 0 : theme.spacing(15)}>
                    <SimpleLineChart/>
                </Grid>
            </Grid>

           
        </>
    );
};

export default Dashboard;
