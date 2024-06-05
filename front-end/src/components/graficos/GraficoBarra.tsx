import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Typography from '@mui/material/Typography';
import { ProjetoStatus } from '../../types/projetos';

// Defina o tipo GetSeriesParams
type GetSeriesParams = {
    hasNegativeValue: boolean;
    stackOffset: string;
};

const availableStackOffset = ['Atibaia', 'Cruzeiro', 'Taubaté'] as const;

type StackOffset = typeof availableStackOffset[number];

// Defina o tipo Projeto
type Projeto = {
    idProjeto: string;
    NomeProjeto: string;
    "Não Atribuido": number;
    "Em andamento": number;
    "Concluido": number;
};

const fetchProjectsData = async (): Promise<Projeto[]> => {
    // Simulando uma chamada de API
    return [
        {
            idProjeto: '1',
            NomeProjeto: 'Atibaia',
            "Não Atribuido": 125,
            "Em andamento": 450,
            "Concluido": 492,
        },
        {
            idProjeto: '2',
            NomeProjeto: 'Cruzeiro',
            "Não Atribuido": 125,
            "Em andamento": 145,
            "Concluido": 203,
        },
        {
            idProjeto: '3',
            NomeProjeto: 'Taubaté',
            "Não Atribuido": 134,
            "Em andamento": 215,
            "Concluido": 342,
        },
    ];
};

const getSeries = (projetos: Projeto[], { hasNegativeValue, stackOffset }: GetSeriesParams) => {
    return projetos.map(projeto => ({
        name: projeto.NomeProjeto,
        "Não Atribuido": projeto["Não Atribuido"],
        "Em andamento": projeto["Em andamento"],
        "Concluido": projeto["Concluido"],
    }));
};

export default function GraficoBarras({andamento,concluidos,naoAtribuido}:ProjetoStatus){
    console.log(andamento,concluidos,naoAtribuido);
    const [stackOffset, setStackOffset] = useState<string>('Gráfico');
    const [hasNegativeValue, setHasNegativeValue] = useState<boolean>(true);
    const [projetos, setProjetos] = useState<Projeto[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchProjectsData();
                setProjetos(data);
            } catch (error) {
                console.error("Erro ao buscar os projetos:", error);
            }
        };

        fetchData();
    }, []);

    const chartWidth = 300;
    const chartHeight = 300;
    const chartMargin = 20;

    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h5">Poligonos</Typography>
                <BarChart
                    width={chartWidth}
                    height={chartHeight}
                    data={getSeries(projetos, { hasNegativeValue, stackOffset })}
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
                    <Bar dataKey="Não Atribuido" stackId="a" fill="#D941CF" />
                    <Bar dataKey="Em andamento" stackId="a" fill="#5854BF" />
                    <Bar dataKey="Concluido" stackId="a" fill="#1BF28E" />
                </BarChart>
            </Box>
        </Box>
    );
};
