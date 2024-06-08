import { Card, CardContent, Stack, Typography } from '@mui/material';
import type { SxProps } from '@mui/material/styles'; // Importando o tipo SxProps

export interface TotalPoligonosProps {
  sx?: SxProps;
  andamento: string;
  concluidos: string;
  naoAtribuido: string;
}

export function TotalPoligonos({ andamento, concluidos, naoAtribuido, sx }: TotalPoligonosProps) {
  const total = parseFloat(andamento) + parseFloat(concluidos) + parseFloat(naoAtribuido);

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={3}>
              <Typography color="text.secondary" variant="overline">
                TOTAL DE POLIGONOS
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
