import * as React from 'react';
import { Avatar, Card, CardContent, Stack, Typography } from '@mui/material';
import type { SxProps } from '@mui/material/styles';
import { ListBullets as ListBulletsIcon } from '@phosphor-icons/react/dist/ssr/ListBullets';
import { ProjetoStatus } from '../../types/projetos';

export interface TasksProgressProps {
  sx?: SxProps;
  value: any;
}

export function TasksProgress({ andamento, concluidos, naoAtribuido }: ProjetoStatus): React.JSX.Element {
  const total = parseFloat(andamento) + parseFloat(concluidos) + parseFloat(naoAtribuido);
  const ResultPercent = parseFloat(((parseFloat(concluidos) / total) * 100).toFixed(2));
  return (
    <Card >
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
              <Typography color="text.secondary" gutterBottom variant="overline">
                Projetos concluídos
              </Typography>
              <Typography variant="h4">{ResultPercent}%</Typography>
            </Stack>
            <Avatar sx={{ backgroundColor: 'var(--mui-palette-warning-main)', height: '56px', width: '56px' }}>
              <ListBulletsIcon fontSize="var(--icon-fontSize-lg)" />
            </Avatar>
          </Stack>
          <Typography color="text.secondary" variant="caption">
            Em projetos listados.
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}


