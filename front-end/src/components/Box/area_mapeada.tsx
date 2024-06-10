import * as React from 'react';
import { useEffect, useState } from 'react';
import { Card, CardContent, Stack, Typography } from '@mui/material';
import axios from 'axios';
import type { SxProps } from '@mui/material/styles';

export interface AreaMapeadaProps {
  sx?: SxProps;
  andamento: string;
  concluidos: string;
  naoAtribuido: string;
}

export function AreaMapeada({ sx, andamento, concluidos, naoAtribuido }: AreaMapeadaProps): React.JSX.Element {
  const [totalArea, setTotalArea] = useState<number>(0);

  useEffect(() => {
    async function fetchProjectData() {
      try {
        const response = await axios.get('/api/admin'); // ajuste a URL conforme necessário
        const projects = response.data;
        const total = projects.reduce((sum: number, project: { area_km2: string }) => sum + parseFloat(project.area_km2), 0);
        setTotalArea(total);
      } catch (error) {
        console.error("Erro ao buscar dados dos projetos:", error);
      }
    }

    fetchProjectData();
  }, []);

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
              <Typography color="text.secondary" gutterBottom variant="overline">
                Áreas Mapeadas
              </Typography>
              <Typography variant="h4">{totalArea.toFixed(2)} Km²</Typography>
            </Stack>
          </Stack>
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
            <Typography color="text.secondary" variant="caption">
              Em projetos listados.
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
