import React from 'react';
import { Link } from 'react-router-dom'
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { Home, AccountCircle, Settings, Lock, LockOpen } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useDrawerContext } from './contexts';

interface IMenuLateralProps {
    [key: string]: any; // Aceita qualquer propriedade
}

const MenuLateral: React.FC<IMenuLateralProps> = (props) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext();

    return (
        <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
            <Box
                width={theme.spacing(30)}
                height="100%"
                display="flex"
                flexDirection="column"
                bgcolor="black" // Cor de fundo preta
                color="white" // Cor do texto branco
            >
                <Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center">
                    {/* Substituído o Avatar por Typography com o texto "Dtracker" estilizado */}
                    <Typography variant="h5" align="center">
                        <strong>D</strong>TRACKER
                    </Typography>
                </Box>

                <Divider style={{ backgroundColor: "gray" }} />

<<<<<<< Updated upstream
                {/* Container para os botões com espaçamento ajustado */}
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                    marginTop={theme.spacing(3)}
                    paddingLeft={theme.spacing(4)}
                >
                    {/* Botões na parte inferior do menu lateral */}
                    <Button startIcon={<Home />} style={{ color: "white", textTransform: "none", marginBottom: theme.spacing(1) }}  component={Link} to="/">
                        Dashboard
                    </Button>
                    <Button startIcon={<AccountCircle />} style={{ color: "white", textTransform: "none", marginBottom: theme.spacing(1) }} component={Link} to="/meusProjetos">
                        Meus Projetos
                    </Button>
                    <Button startIcon={<Settings />} style={{ color: "white", textTransform: "none", marginBottom: theme.spacing(1) }} component={Link} to="/GestaoDeAcesso">
                    Gestao De Acesso
                    </Button>
                    
                    <Button startIcon={<LockOpen />} style={{ color: "white", textTransform: "none" }}>
                        Sign Out
                    </Button>
                </Box>
                <Box display="flex" justifyContent="center" marginTop={theme.spacing(12)}>
                    <img src="/dtracker-192x192-semfundo.png" alt="Logo" style={{ width: "50%", height: "auto" }} />
                </Box>
            </Box>
        </Drawer>
    );
=======
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
          height={theme.spacing(20)}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {/* Substituído o Avatar por Typography com o texto "Dtracker" estilizado */}
          <Typography variant="h5" align="center">
            <strong>D</strong>-TRACKER
          </Typography>
        </Box>

        <Divider style={{ backgroundColor: "gray" }} />

        {/* Container para os botões com espaçamento ajustado */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          marginTop={theme.spacing(3)}
          paddingLeft={theme.spacing(4)}
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
            to="/Dashboard"
          >
            Dashboard
          </Button>
          <Button
            startIcon={<AccountCircle />}
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
          marginTop={theme.spacing(12)}
        >
          <img
            src="/dtracker-192x192-semfundo.png"
            alt="Logo"
            style={{ width: "50%", height: "auto" }}
          />
        </Box>
      </Box>
    </Drawer>
  );
>>>>>>> Stashed changes
};

export default MenuLateral;