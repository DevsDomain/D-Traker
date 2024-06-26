import * as React from 'react';
import { Avatar, Card, CardContent, Stack, Typography } from '@mui/material';
import type { SxProps } from '@mui/material/styles';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useState ,useEffect} from 'react';


export interface TotalTasksProps {
  sx?: SxProps;
  value: string;
  naoAtribuido: string; // Alterado para aceitar apenas o número de tarefas não atribuídas
}

function formatNumber(value: string): number {
  const number = parseFloat(value);
  if (number >= 1000) {
    return parseFloat((number / 1000).toString());
  } else {
    return parseFloat(number.toString());
  }
}


export function TotalTasks({ value, naoAtribuido, sx }: TotalTasksProps): React.JSX.Element {
  const [newTasks,setNewTasks]  = useState(0);

  useEffect(() => {
    setNewTasks(formatNumber(naoAtribuido))
  }, [naoAtribuido]);


  return (
    <Card sx={{ width: 200, height: 278 }}>
      <CardContent>
        <Stack spacing={4}>
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={3} alignItems="center">
              <Typography color="text.secondary" variant="overline">
                New Tasks
                <Avatar sx={{ backgroundColor: '#1f7cd3', height: '56px', width: '56px', align: 'center' }}>
                  <TaskAltIcon style={{ width: '100%', height: '80%' }} /> {/* Ícone de tarefas do Material-UI */}
                </Avatar>
              </Typography>
              <Typography color="text.primary" variant="h4">{newTasks || 0}</Typography> {/* Exibe apenas o número de tarefas não atribuídas */}

            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}