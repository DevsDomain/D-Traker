import * as React from 'react';
import { useEffect, useState } from 'react';
import { Card, CardContent, Stack, Typography } from '@mui/material';
import LayersRoundedIcon from '@mui/icons-material/LayersRounded';
import type { SxProps } from '@mui/material/styles';
import { Avatar } from '@mui/material';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import { fetchTotalkm } from '../../services/totalArea';

export interface AreaMapeadaProps {
  sx?: SxProps;
}
export interface AreaMapeadaResponse {
  totalArea: number;
}

export function AreaMapeada({ sx }: AreaMapeadaProps): React.JSX.Element {
  const [totalArea, setTotalArea] = useState<number>(0);

  useEffect(() => {
    async function fetchTotalArea() {
      try {
        const response : AreaMapeadaResponse = await fetchTotalkm(); // Ajuste a URL conforme necessário
        const totalArea = response.totalArea;

        setTotalArea(totalArea);
      } catch (error) {
        console.error("Erro ao buscar a soma total das áreas:", error);
      }
    }

    fetchTotalArea();
  }, []); // Dependências vazias significam que isso será executado apenas uma vez, quando o componente for montado

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={3}>
              <Typography color="text.secondary" variant="overline">
                TOTAL DE ÁREAS
                <Avatar sx={{ backgroundColor: '#1f7cd3', height: '56px', width: '56px', align: 'center' }}>
                  <LayersRoundedIcon style={{ width: '100%', height: '100%' }} />
                </Avatar>
              </Typography>
              <Typography variant="h4">{totalArea.toFixed(2)} Km²</Typography>
            </Stack>
          </Stack>
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
