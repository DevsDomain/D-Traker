import * as React from 'react';
import Box from '@mui/material/Box';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Typography } from '@mui/material';
import { ProjetoStatus } from '../../types/projetos';

interface CustomLabelProps {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
}

export default function GraficoPizza({andamento,concluidos,naoAtribuido}:ProjetoStatus) {

    const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: CustomLabelProps) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
        const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

        return (
            <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontWeight="bold">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5">Projetos</Typography>
                <PieChart width={300} height={300}>
                    <Pie
                        data={[
                            { name: 'Finalizado', value: parseInt(concluidos) },
                            { name: 'Em andamentos', value: parseInt(andamento) },
                            { name: 'Não atribuido', value: parseInt(naoAtribuido) },
 
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={renderCustomLabel}
                        labelLine={false}
                    >
                        <Cell fill="#77d65f" />
                        <Cell fill="#328aad" />
                        <Cell fill="#b44124" />
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
        
            </Box>
        </Box>
    );
}