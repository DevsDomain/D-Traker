import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { Home, AccountCircle, Settings, LockOpen } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDrawerContext } from "./contexts";
import useAuth from "../../hooks/auth";
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";
import ListAltIcon from '@mui/icons-material/ListAlt';

interface IMenuLateralProps {
  [key: string]: any; // Aceita qualquer propriedade
}

const MenuLateral: React.FC<IMenuLateralProps> = (props) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext();
  const [userName, setUser] = useState<string | null>(null);
  const { handleLogOut, user } = useAuth();
  const name = user.name.split(" ")[0]

  useEffect(() => {
    localStorage["userName"] && setUser(localStorage["userName"]);
  }, [user]);

  function logout() {
    handleLogOut();
    document.location.reload();
  }

  return (
    <Drawer
      open={isDrawerOpen}
      variant={smDown ? "temporary" : "permanent"}
      onClose={toggleDrawerOpen}
    >
      <Box
        width={theme.spacing(30)}
        height="100%"
        display="flex"
        flexDirection="column"
        bgcolor="black" // Cor de fundo preta
        color="white" // Cor do texto branco
      >
        <Box
          width="100%"
          height={theme.spacing(12)}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          {/* Texto "Bem-vindo" */}
          <Typography variant="h6" align="center" sx={{ margin: theme.spacing(2) }}>
            Bem-vindo(a)
          </Typography>

          {/* Ícone do usuário */}
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={15}>
            <AccountCircle sx={{ fontSize: 40 }} /> {/* Ajuste o tamanho do ícone aqui */}
          </Stack>
        </Box>

        <Box
          width="100%"
          height={theme.spacing(15)}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >

          <Typography variant="h6" align="center" sx={{ color: '#3797cf' }}>
            <span>{name}</span>
          </Typography>

        </Box>


        <Divider style={{ backgroundColor: "gray" }} />

        {/* Container para os botões com espaçamento ajustado */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          marginTop={theme.spacing(4)}
          paddingLeft={theme.spacing(2)}
        >
          {/* Botões na parte inferior do menu lateral */}
          <Button
            startIcon={<Home />}
            style={{
              color: "white",
              textTransform: "none",
              marginBottom: theme.spacing(1),
            }}
            component={Link}
            to="/"
          >
            Dashboard
          </Button>
          <Button
            startIcon={<ListAltIcon/>}
            style={{
              color: "white",
              textTransform: "none",
              marginBottom: theme.spacing(1),
            }}
            component={Link}
            to="/meusProjetos"
          >
            Meus Projetos
          </Button>
          <Button
            startIcon={<Settings />}
            style={{
              color: "white",
              textTransform: "none",
              marginBottom: theme.spacing(1),
            }}
            component={Link}
            to="/GestaoDeAcesso"
          >
            Gestao De Acesso
          </Button>
          <Button
            startIcon={<LockOpen />}
            style={{ color: "white", textTransform: "none" }}
            onClick={logout}
          >
            Sign Out
          </Button>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          marginTop={theme.spacing(14)}
        >
          <img
            src="/dtracker-192x192-semfundo.png"
            alt="Logo"
            style={{ width: "50%", height: "auto", marginBottom: theme.spacing(0) }}
          />
        </Box>
        <Box
          width="100%"
          height={theme.spacing(10)}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {/* Substituído o Avatar por Typography com o texto "Dtracker" estilizado */}
          <Typography variant="h6" align="center">
            <strong>D</strong>TRACKER
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

export default MenuLateral;
