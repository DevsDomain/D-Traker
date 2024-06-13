import * as React from 'react';
import Box from '@mui/material/Box';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Typography } from '@mui/material';
import { ProjetoStatus } from '../../types/projetos';
import { useDashboard } from '../../contexts/dashboardContext';

interface CustomLabelProps {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
}

export default function GraficoPizza({andamento,concluidos,naoAtribuido}:ProjetoStatus) {
    const {state} = useDashboard()

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
        <div style={{ width: '120%', display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5">Completamento de projeto</Typography>
            
            {state.projetos.length === 1 && <Typography marginTop={2}>{state.projetos[0].value}</Typography>}
                <PieChart width={500} height={250}>
                    <Pie
                        data={[
                            { name: 'Atividades Finalizadas', value: parseInt(concluidos) },
                            { name: 'Atividades em andamento', value: parseInt(andamento) },
                            { name: 'Atividades não atribuidas', value: parseInt(naoAtribuido) },
 
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={renderCustomLabel}
                        labelLine={false}
                    >
                        <Cell fill="#1c9942" />
                        <Cell fill="#5854BF" />
                        <Cell fill="#D941CF" />
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
        
            </div>
        </div>
    );
}