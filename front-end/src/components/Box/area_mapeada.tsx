import * as React from 'react';
import { Card, CardContent, Stack, Typography } from '@mui/material';
import type { SxProps } from '@mui/material/styles';
import { ProjetoStatus } from '../../types/projetos';

export interface TasksProgressProps {
  sx?: SxProps;
  value: any;
}

export function AreaMapeada({ andamento, concluidos, naoAtribuido }: ProjetoStatus): React.JSX.Element {
  const total = parseFloat(andamento) + parseFloat(concluidos) + parseFloat(naoAtribuido);

  return (
    <Card >
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
              <Typography color="text.secondary" gutterBottom variant="overline">
                Áreas Mapeadas
              </Typography>
              <Typography variant="h4">{total} Km</Typography>
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


