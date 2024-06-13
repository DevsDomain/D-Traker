/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Typography from "@mui/material/Typography";
import { ProjetoStatus } from "../../types/projetos";
import { fetchPoligonos } from "../../services/poligonos";
import useAuth from "../../hooks/auth";

// Defina o tipo GetSeriesParams
type GetSeriesParams = {
  hasNegativeValue: boolean;
  stackOffset: string;
};

const availableStackOffset = ["Atibaia", "Cruzeiro", "Taubaté"] as const;

type StackOffset = (typeof availableStackOffset)[number];

// Defina o tipo Projeto
type Projeto = {
  Projeto: string;
  NomeProjeto: string;
  "Não Atribuido": string;
  "Em andamento": string;
  Concluido: string;
};

const fetchProjectsData = async (
  idProjeto: string,
  role: string
): Promise<Projeto[]> => {
  let apiResponse = await fetchPoligonos();
  console.log("aqui agora", apiResponse);
  let resultados: Projeto[] = [];
  if (role !== "adm") {
    console.log("antes", idProjeto);
    apiResponse = apiResponse.filter(
      (projeto: any) => Number(projeto.projeto) === Number(idProjeto)
    );
    console.log(" agora", apiResponse);
    resultados = [
      {
        Projeto: apiResponse[0].projeto,
        NomeProjeto: apiResponse[0].nomeProjeto,
        "Não Atribuido": apiResponse[0].naoAtribuido,
        "Em andamento": apiResponse[0].andamento,
        Concluido: apiResponse[0].concluidos,
      },
    ];
  }
  if (role === "adm") {
    resultados = [
      {
        Projeto: apiResponse[0].projeto,
        NomeProjeto: apiResponse[0].nomeProjeto,
        "Não Atribuido": apiResponse[0].naoAtribuido,
        "Em andamento": apiResponse[0].andamento,
        Concluido: apiResponse[0].concluidos,
      },
      {
        Projeto: apiResponse[1].projeto,
        NomeProjeto: apiResponse[1].nomeProjeto,
        "Não Atribuido": apiResponse[1].naoAtribuido,
        "Em andamento": apiResponse[1].andamento,
        Concluido: apiResponse[1].concluidos,
      },
      {
        Projeto: apiResponse[2].projeto,
        NomeProjeto: apiResponse[2].nomeProjeto,
        "Não Atribuido": apiResponse[2].naoAtribuido,
        "Em andamento": apiResponse[2].andamento,
        Concluido: apiResponse[2].concluidos,
      },
    ];
  }
  return resultados;
};

const getSeries = (
  projetos: Projeto[],
  { hasNegativeValue, stackOffset }: GetSeriesParams
) => {
  return projetos.map((projeto) => ({
    name: projeto.NomeProjeto,
    "Não Atribuido": projeto["Não Atribuido"],
    "Em andamento": projeto["Em andamento"],
    Concluido: projeto["Concluido"],
  }));
};

interface GraficoBarrasProps {
  andamento: string;
  concluidos: string;
  naoAtribuido: string;
}

const GraficoBarras: React.FC<GraficoBarrasProps> = ({
  andamento,
  concluidos,
  naoAtribuido,
}) => {
  const { user } = useAuth();
  console.log(andamento, concluidos, naoAtribuido);
  const [stackOffset, setStackOffset] = useState<string>("Gráfico");
  const [hasNegativeValue, setHasNegativeValue] = useState<boolean>(false); // Assume that there are no negative values initially
  const [projetos, setProjetos] = useState<Projeto[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProjectsData(user.idProjeto, user.role);
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
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography variant="h5">Polígonos</Typography>
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

export default GraficoBarras;
