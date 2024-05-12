import * as React from 'react';
import Box from '@mui/material/Box';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Typography } from '@mui/material';

interface CustomLabelProps {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
}

export default function GraficoPizza() {
    const [selectedGroup, setSelectedGroup] = React.useState('Group A');

    const handleGroupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedGroup(event.target.value);
    };

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
                            { name: 'Projeto Atibaia', value: 400 },
                            { name: 'Projeto Taubaté', value: 300 },
                            { name: 'Projeto Cruzeiro', value: 300 },
                            { name: 'Projeto D', value: 200 },
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={renderCustomLabel}
                        labelLine={false}
                    >
                        <Cell fill="#b34dc0" />
                        <Cell fill="#281497" />
                        <Cell fill="#18bcc2" />
                        <Cell fill="#431e58" />
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
                <div>
                    <label htmlFor="group-select">Selecione um projeto:</label>
                    <select id="group-select" value={selectedGroup} onChange={handleGroupChange}>
                        <option value="Projeto A">Atibaia</option>
                        <option value="Projeto B">Taubaté</option>
                        <option value="Projeto C">Cruzeiro</option>
                        <option value="Projeto D">D</option>
                    </select>
                </div>
            </Box>
        </Box>
    );
}