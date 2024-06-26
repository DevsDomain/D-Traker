import { Card, CardContent, Stack, Typography } from '@mui/material';
import type { SxProps } from '@mui/material/styles'; // Importando o tipo SxProps
import { Avatar } from '@mui/material';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';

export interface TotalPoligonosProps {
  sx?: SxProps;
  andamento: string;
  concluidos: string;
  naoAtribuido: string;
}

export function TotalPoligonos({ andamento, concluidos, naoAtribuido, sx }: TotalPoligonosProps) {
  const total = parseFloat(andamento) + parseFloat(concluidos) + parseFloat(naoAtribuido);

  return (
    <Card sx={{ width: 200, height: 278 }}> 
      <CardContent>
        <Stack spacing={8}>
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={3}>
              <Typography color="text.secondary" variant="overline">
                TOTAL DE POLIGONOS
                <Avatar sx={{ backgroundColor: '#1f7cd3', height: '56px', width: '56px', align: 'center' }}>
                  <LeaderboardIcon style={{ width: '100%', height: '80%' }} /> {/* Ícone de tarefas do Material-UI */}
                </Avatar>
              </Typography>
              <Typography variant="h4">{total || 0}</Typography>
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
