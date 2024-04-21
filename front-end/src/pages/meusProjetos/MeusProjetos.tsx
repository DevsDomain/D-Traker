import React from 'react';
import { Box } from '@mui/system';
import MenuLateral from '../menu-lateral/MenuLateral';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const MeusProjetos: React.FC = () => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            <MenuLateral />
            <Box
                height="90vh"
                marginLeft={smDown ? 0 : theme.spacing(35)}
                marginTop={theme.spacing(4)} // Adicionando margem acima
                paddingLeft={smDown ? theme.spacing(2) : theme.spacing(4)} // Adicionando margem à esquerda responsiva
            >
                {"Meus projetos"}
            </Box>
        </>
    );
};

export default MeusProjetos;