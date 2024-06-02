import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

export interface TotalTasksProps {
  sx?: SxProps;
  value: string;
  naoAtribuido: string; // Alterado para aceitar apenas o número de tarefas não atribuídas
}

function formatNumber(value: string): string {
  const number = parseFloat(value);
  if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'k';
  } else {
    return number.toString();
  }
}

export function TotalTasks({ value, naoAtribuido, sx }: TotalTasksProps): React.JSX.Element {
  const formattedValue = formatNumber(value);
  const formattedNaoAtribuido = formatNumber(naoAtribuido);
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
          <Stack spacing={1}>
          <Typography color="text.secondary" variant="overline">
              Total Tasks
            <Avatar sx={{ backgroundColor: '#1f7cd3', height: '56px', width: '56px', align: 'center' }}>
              <TaskAltIcon style={{ width: '100%', height: '100%' }} /> {/* Ícone de tarefas do Material-UI */}
            </Avatar>
            <Typography color="text.primary" variant="h4">{formattedNaoAtribuido}</Typography> {/* Exibe apenas o número de tarefas não atribuídas */}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}