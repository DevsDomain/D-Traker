import * as React from 'react';
import { Avatar, Card, CardContent, Stack, Typography } from '@mui/material';
import type { SxProps } from '@mui/material/styles';
import { ListBullets as ListBulletsIcon } from '@phosphor-icons/react/dist/ssr/ListBullets';
import { ProjetoStatus } from '../../types/projetos';
import { DoneOutline } from '@mui/icons-material';

export interface TasksProgressProps {
  sx?: SxProps;
  value: any;
}

export function TasksProgress({ andamento, concluidos, naoAtribuido }: ProjetoStatus): React.JSX.Element {
  const total = parseFloat(andamento) + parseFloat(concluidos) + parseFloat(naoAtribuido);
  const ResultPercent = parseFloat(((parseFloat(concluidos) / total) * 100).toFixed(2));
  return (
    <Card>
      <CardContent>
        <Stack spacing={5}>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline" style={{ marginRight: '8px', whiteSpace: 'nowrap' }}>
                Projetos concluídos
              </Typography>
              <div>
                <Avatar sx={{ backgroundColor: '#1f7cd3', height: '56px', width: '56px' }}>
                  <DoneOutline style={{ width: '100%', height: '100%' }} /> {/* Ícone de tarefas do Material-UI */}
                </Avatar>
              </div>
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

