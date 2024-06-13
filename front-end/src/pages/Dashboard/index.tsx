// Dashboard.tsx
import React from "react";
import { Grid, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import GraficoBarras from "../../components/graficos/GraficoBarra";
import GraficoPizza from "../../components/graficos/GraficoStatusProjeto";
import { TasksProgress } from "../../components/Box/tasks_progress";
import GraficoDeApontamentos from "../../components/graficos/GraficoLinha";
import BasicSelect from "../../components/Select";
import {
  DashboardProvider,
  useDashboard,
} from "../../contexts/dashboardContext";
import { TotalTasks } from "../../components/Box/total_tasks";
import { TotalPoligonos } from "../../components/Box/total_poligonos";
import { AreaMapeada } from "../../components/Box/area_mapeada";
import { Box } from "@mui/system";

const DashboardContent: React.FC = () => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const { state, setFiltroMembros, setFiltroProjetos } = useDashboard();
  const { projetoStatus } = state;
  const handleProjetoChange = (value: string) => {
    setFiltroProjetos(value);
  };

  const handleMembroChange = (value: string) => {
    setFiltroMembros(value);
  };

  return (
    <Box overflow="hidden">
      <Stack width={"50vw"} direction={"row"} marginLeft={60}>
        <BasicSelect
          projeto={state.projetos}
          handlePesquisaByProjeto={setFiltroProjetos}
          onChange={handleProjetoChange}
          placeHolder="Projetos"
          value={state.selectedProject || ""}
        />
      </Stack>

      <Grid
        container
        spacing={3}
        justifyContent="left"
        marginLeft={smDown ? 0 : theme.spacing(35)}
        marginTop={smDown ? 0 : theme.spacing(0)}
      >
        <Grid item lg={2.3} sm={3} xs={12}>
          <TotalTasks
            value="Total"
            naoAtribuido={projetoStatus.naoAtribuido}
            sx={{ height: "100%", width: "80%" }}
          />
        </Grid>

        <Grid item lg={2.3} sm={3} xs={12}>
          <TotalPoligonos
            andamento={projetoStatus.andamento}
            concluidos={projetoStatus.concluidos}
            naoAtribuido={projetoStatus.naoAtribuido}
            sx={{ height: "100%", width: "80%" }}
          />
        </Grid>

        <Grid item lg={2.3} sm={3} xs={12}>
          <TasksProgress
            andamento={projetoStatus.andamento}
            concluidos={projetoStatus.concluidos}
            naoAtribuido={projetoStatus.naoAtribuido}
          />
        </Grid>

        <Grid item lg={2.3} sm={3} xs={12}>
          <AreaMapeada sx={{ height: "100%", width: "80%" }} />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={0}
        marginLeft={smDown ? 0 : theme.spacing(30)}
        marginTop={smDown ? 0 : theme.spacing(5)}
      >
        <Grid item xs={3} sm={3}>
          <GraficoPizza
            andamento={projetoStatus.andamento}
            concluidos={projetoStatus.concluidos}
            naoAtribuido={projetoStatus.naoAtribuido}
          />
        </Grid>
        <Grid item xs={3} sm={3}>
          <GraficoPizza
            andamento={projetoStatus.andamento}
            concluidos={projetoStatus.concluidos}
            naoAtribuido={projetoStatus.naoAtribuido}
          />
        </Grid>
        <Grid item xs={3} sm={3}>
          <GraficoBarras
            andamento={projetoStatus.andamento}
            naoAtribuido={projetoStatus.naoAtribuido}
            concluidos={projetoStatus.concluidos}
          />
        </Grid>

        <Grid
          item
          xs={20}
          sm={3}
          marginLeft={smDown ? 0 : theme.spacing(5)}
          marginTop={smDown ? 0 : theme.spacing(15)}
        >
          <BasicSelect
            projeto={state.projetos}
            handlePesquisaByProjeto={setFiltroProjetos}
            onChange={handleProjetoChange}
            placeHolder="Projetos"
            value={state.selectedProject || ""}
          />

          <BasicSelect
            projeto={state.membros}
            handlePesquisaByProjeto={setFiltroMembros}
            onChange={handleMembroChange}
            placeHolder="Membros"
            value={state.selectedMember || ""}
          />
          <GraficoDeApontamentos
            alteracoes={
              state.filteredAlteracoes.length === 0
                ? state.alteracoes
                : state.filteredAlteracoes
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
};

const Dashboard: React.FC = () => (
  <DashboardProvider>
    <DashboardContent />
  </DashboardProvider>
);

export default Dashboard;
