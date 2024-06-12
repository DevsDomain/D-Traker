import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { SxProps } from '@mui/material/styles'; // Importando o tipo SxProps
import { Avatar } from '@mui/material';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';

export interface TotalPoligonosProps {
  sx?: SxProps;
  andamento: string;
  concluidos: string;
  naoAtribuido: string;
}

/*
function formatNumber(value: string): string {
  const number = parseFloat(value);
  if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'k';
  } else {
    return number.toString();
  }
}
*/

export function TotalPoligonos({ andamento, concluidos, naoAtribuido, sx }: TotalPoligonosProps) {
  const total = parseFloat(andamento) + parseFloat(concluidos) + parseFloat(naoAtribuido);
  //const formattedTotal = formatNumber(total.toString());

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={3}>
              <Typography color="text.secondary" variant="overline">
                TOTAL DE POLIGONOS
                <Avatar sx={{ backgroundColor: '#1f7cd3', height: '56px', width: '56px', align: 'center' }}>
                  <LeaderboardIcon style={{ width: '100%', height: '100%' }} /> {/* Ícone de tarefas do Material-UI */}
                </Avatar>
              </Typography>
              <Typography variant="h4">{total}</Typography>
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
