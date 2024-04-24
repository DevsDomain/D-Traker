import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

// Defina o tipo GetSeriesParams
type GetSeriesParams = {
    hasNegativeValue: boolean;
    stackOffset: string;
};

const availableStackOffset = ['Atibaia', 'Cruzeiro', 'Taubaté'] as const;

const getSeries = ({ hasNegativeValue, stackOffset }: GetSeriesParams) => [
    {
        name: 'Atibaia',
        seriesA: 125,
        seriesB: 450,
        seriesC: 492,
        seriesD: 625,
    },
    {
        name: 'Cruzeiro',
        seriesA: 50,
        seriesB: 145,
        seriesC: 203,
        seriesD: 620,
    },
    {
        name: 'Taubaté',
        seriesA: 134,
        seriesB: 215,
        seriesC: 342,
        seriesD: 402,
    },
];

export default function Grafico() {
    const [stackOffset, setStackOffset] = React.useState<string>('Gráfico');
    const [hasNegativeValue, setHasNegativeValue] = React.useState<boolean>(true);

    const handleNegativeValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHasNegativeValue(event.target.checked);
    };

    const chartWidth = 300; // Largura do gráfico
    const chartHeight = 300; // Altura do gráfico
    const chartMargin = 20; // Margem padrão do gráfico
    const containerWidth = 640; // Largura do contêiner

    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Stack direction="row" sx={{ mb: 2 }}>
                    <TextField
                        sx={{ minWidth: 150, mr: 5 }}
                        select
                        label="Projetos"
                        value={stackOffset}
                        onChange={(event) => setStackOffset(event.target.value)}
                    >
                        {availableStackOffset.map((offset) => (
                            <MenuItem key={offset} value={offset}>
                                {offset}
                            </MenuItem>
                        ))}
                    </TextField>

                </Stack>

                <BarChart
                    width={chartWidth}
                    height={chartHeight}
                    data={getSeries({ hasNegativeValue, stackOffset })}
                    margin={{
                        top: 20,
                        right: chartMargin,
                        bottom: 5,
                        left: chartMargin,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <text x="50%" y="8" textAnchor="middle" dominantBaseline="middle" fontSize="16" fill="#333">
                        Gráfico de Barras
                    </text>
                    <Legend />
                    <Bar dataKey="seriesA" stackId="a" fill="#b34dc0" />
                    <Bar dataKey="seriesB" stackId="a" fill="#281497" />
                    <Bar dataKey="seriesC" stackId="a" fill="#18bcc2" />
                </BarChart>
            </Box>

  
        </Box>
    );
}