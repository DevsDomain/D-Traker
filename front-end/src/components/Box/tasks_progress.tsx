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
    <Card sx={{ width: 200, height: 278  }}> 
      <CardContent>
        <Stack spacing={9}>
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }} spacing={7}>
            <Stack spacing={3}>
            <Typography color="text.secondary" variant="overline" style={{ marginRight: '8px', whiteSpace: 'nowrap' }}>
                Projetos concluídos
              </Typography>
              <div>
                <Avatar sx={{ backgroundColor: '#1f7cd3', height: '56px', width: '56px', marginTop: '-15px' }}>
                  <DoneOutline style={{ width: '100%', height: '80%' }} /> {/* Ícone de tarefas do Material-UI */}
                </Avatar>
              </div>
              <Typography variant="h4">{ResultPercent || 0}%</Typography>
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

