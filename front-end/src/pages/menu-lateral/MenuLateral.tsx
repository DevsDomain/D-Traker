import { AccountCircle, Home, Settings } from "@mui/icons-material";
import { Button, Divider, Drawer, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useDrawerContext } from "./contexts";
import { Lock } from "@mui/icons-material";
import { LockOpen } from "@phosphor-icons/react/dist/ssr";

interface DrawerOption {
    path: string;
    icon: JSX.Element; // Alterado para JSX.Element para aceitar ícones do MUI
    label: string;
}

interface IMenuLateralProps {
    drawerOptions?: DrawerOption[];
}

export const MenuLateral: React.FC<IMenuLateralProps> = ({ drawerOptions = [] }) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext();

    return (
        <>
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

                    {/* Container para os botões com espaçamento ajustado */}
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="flex-start"
                        marginTop={theme.spacing(3)}
                        paddingLeft={theme.spacing(4)}
                    >
                        {/* Botões na parte inferior do menu lateral */}
                        <Button startIcon={<Home />} style={{ color: "white", textTransform: "none", marginBottom: theme.spacing(1) }}>
                            Dashboard
                        </Button>
                        <Button startIcon={<AccountCircle />} style={{ color: "white", textTransform: "none", marginBottom: theme.spacing(1) }}>
                            Meus Projetos
                        </Button>
                        <Button startIcon={<Settings />} style={{ color: "white", textTransform: "none", marginBottom: theme.spacing(1) }}>
                            Admin
                        </Button>
                        <Button startIcon={<Lock />} style={{ color: "white", textTransform: "none" }}>
                            Sign In
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

            <Box
                height="90vh"
                marginLeft={smDown ? 0 : theme.spacing(35)}
                marginTop={theme.spacing(4)} // Adicionando margem acima
                paddingLeft={smDown ? theme.spacing(2) : theme.spacing(4)} // Adicionando margem à esquerda responsiva
            >
                {"Conteúdo da página aqui"}
            </Box>
        </>
    );
};